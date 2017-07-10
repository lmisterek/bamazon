
DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(

  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL, 
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Tickle Me Elmo", "Toys", 24.99, 100), 
("Apple I-phone 7", "Electronics", 599.99, 240),
("Black Fidget Spinner", "Toys", 21.99, 120),
("Vanilla Syrup", "Food", 4.50, 17),
("Black & Decker Drill", "Tools", 28.99, 110),
("Heft Trash Bags (5 gallon)", "Household", 4.50, 300),
("Breakfast Blend 60 count K-cups", "Food", 45.00, 20),
("Maxcraft Claw Hammer", "Tools", 10.89, 120),
("Melissa & Doug Easel", "Toys", 61.99, 2), 
("Melissa & Doug Easel Accessory Set - Paint, Cups, Brushes, Chalk, Paper, Dry-Erase Marker", "Toys", 33.83, 3);