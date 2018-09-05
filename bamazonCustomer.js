var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

function displayItems() {
    var divider = "\n\n-------------------------------------------------\n";
    console.log("\nItems available for sale:" + divider);
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // console.log(res);
        res.forEach(function(product) {
            console.log(product.product_name + " (Item ID: " + product.item_id + "), $" + product.price + "\nDepartment: " + product.department_name + divider);
        });
        // nesting promptUser() in here allows for correct order of console logging
        promptUser();
    });
    connection.end();
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
        console.log("hi");
    })
}

function checkStock() {
    // are there enough items in stock to fulfill the user's order?
    // if enough in stock to fulfill order, update products table with new stock quantity
    // else, log "Insufficient quantity" & return false
}

function updateProducts() {
    // if checkStock(), update products table with new stock quantity
    // then show customer total cost of their purchase
}

connection.connect(function(err) {
    if (err) throw err;
    displayItems();
});