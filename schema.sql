DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50),
    price DEC(10,2),
    stock_quantity INT(10),
    PRIMARY KEY (item_id)
);

SELECT * FROM products;