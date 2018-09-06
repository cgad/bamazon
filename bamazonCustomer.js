var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

function displayItems() {
    console.log("\nItems available for sale:\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);

        // nesting promptUser() in here allows for correct order of console logging
        promptUser();
    });
};

function promptUser() {
    inquirer.prompt([
        {
            message: "Enter the ID of the item you would like to buy:",
            type: "input",
            name: "id"
        },
        {
            message: "Enter the number of units you would like to buy:",
            type: "input",
            name: "units"
        }
    ])
    .then(function(response) {
        connection.query("SELECT * FROM products WHERE item_id=" + response.id, function(err, res) {
            if (err) throw err;

            // check stock. if enough in stock, update new stock quantity and give user total cost of order
            var corrStock = res[0].stock_quantity;
            var unitPrice = res[0].price;
            if (response.units <= corrStock) {
                var newQuantity = corrStock - response.units;
                connection.query("UPDATE products SET ? WHERE ?", 
                [
                    {
                        stock_quantity: newQuantity
                    },
                    {
                        item_id: response.id
                    }
                ], function(err, res) {
                    if (err) throw err;
                    var totalCost = response.units * unitPrice;
                    console.log("\nYour total cost is $" + totalCost + ".");
                    displayItems();
                })
            } else {
                console.log("\nInsufficient quantity.");
                displayItems();
            }
        })
    })
}

connection.connect(function(err) {
    if (err) throw err;
    displayItems();
});