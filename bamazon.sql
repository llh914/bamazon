CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id integer not null auto_increment,
	product_name varchar(50) not null,
	department_name varchar(50) not null,
	price integer not null,
	stock_quantity integer not null,
	PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Covergirl Mascara", "Beauty", 7, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beauty Blender", "Beauty", 20, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NIKE AF1 Mid", "Shoes", 100, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Converse CTAS", "Shoes", 50, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("YETI Tumbler", "Drinkware", 40 , 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("RTIC Tumbler", "Drinkware", 20, 83);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone 8", "Electronics", 750, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung Galaxy S8", "Electronics", 726, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Black Dress", "Apparel",50, 47);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Red Shirt", "Apparel", 15, 33);