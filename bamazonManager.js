var config = require("./config.js");
var mysql = require("mysql");
var inquirer = require('inquirer');
require('console.table');

var connection = mysql.createConnection(config);

connection.connect(function(error) {
	if(error) throw error;
});

function start() {
	inquirer.prompt({
		name: "action",
		type: "list",
		message: "What would you like to do?",
		choices: [
			"View Products for Sale", 
			"View Low Inventory", 
			"Add to Inventory", 
			"Add New Product"
		]
	}).then(function(answer) {
		switch (answer.action) {
		    case "View Products for Sale":
		      viewProducts();
		      break;
		    case "View Low Inventory":
		      lowInventory();
		      break;
		    case "Add to Inventory":
		      addInventory();
		      break;
		    case "Add New Product":
		      addProduct();
		      break;
		  };
	});
};

start();

function viewProducts() {
	connection.query ("SELECT * FROM products", function(error, response) {
		if (error) throw (error);
		console.table(response);
		start();
	});
};

function lowInventory() {
	connection.query ("SELECT * FROM products WHERE stock_quantity <5",function(error, response) {
		if (error) throw (error);
		if (response.length === 0) {
			console.log("There are no products with low inventories");
			start();
		} else {
			console.table(response);
			start();
		}
	});	
};

function addInventory() {
	connection.query ("SELECT * FROM products", function(error, response) {
		if (error) throw (error);
		console.table(response);
		inquirer.prompt([
			{
				name: "item_id",
				type: "input",
				message: "What is the ID of the item for which you would like to update the inventory?",
				validate: function(value) {
					if(isNaN(value) === false) {
						return true;
					}
					return false;
				}
			}, {
				name: "quantity",
				type: "input",
				message: "How many units would you like to add?",
				validate: function(value) {
					if(isNaN(value) === false) {
						return true;
					}
					return false;
				}
			}
		]).then(function(answer) {
			var chosenItem;
			var quantityInt = parseInt(answer.quantity);
			var itemIdInt = parseInt(answer.item_id);
			for (var i = 0; i < response.length; i++) {
				if (response[i].item_id === itemIdInt) {
					chosenItem = response[i]
				}
			};
			connection.query("UPDATE products SET ? WHERE ?", [{
				stock_quantity: chosenItem.stock_quantity + quantityInt
			}, {
				item_id: chosenItem.item_id
			}], function(error, response) {
				if (error) throw error;
				console.log("The stock quantity for " + chosenItem.product_name + " has been updated to " + (chosenItem.stock_quantity + quantityInt) + ".")
				start();
			})	
		});
	});
};

function addProduct() {
	inquirer.prompt([
		{
			name: "product_name",
			type: "input",
			message: "What is the name of the new product you would like to add?"
		}, {
			name: "department_name",
			type: "input",
			message: "Which Department does this product belong to?"
		},{
			name: "price",
			type: "input",
			message: "What is the retail price of this product?",
			validate: function(value) {
				if(isNaN(value) === false) {
					return true;
				}
				return false;
			}
		},{
			name: "stock_quantity",
			type: "input",
			message: "What is the stock quantity of this product?",
			validate: function(value) {
				if(isNaN(value) === false) {
					return true;
				}
				return false;
			}
		}
	]).then(function(answer) {
		connection.query("INSERT INTO products SET ?", {
		  product_name: answer.product_name,
		  department_name: answer.department_name,
		  price: answer.price,
		  stock_quantity: answer.stock_quantity
		}, function(error, response) {
			if (error) throw error;
			console.log("The new product has been added to the inventory!")
			start();
		});
	});
};

