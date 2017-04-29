var config = require("./config.js");
var mysql = require("mysql");
var inquirer = require('inquirer');
require('console.table');

var connection = mysql.createConnection(config);

connection.connect(function(error) {
	if(error) throw error;
});

function order() {
	connection.query ("SELECT * FROM products", function(error, response) {
		if (error) throw (error);
		console.table(response);
		inquirer.prompt([
			{
				name: "item_id",
				type: "input",
				message: "What is the ID of the item you would like to purchase?",
				validate: function(value) {
					if(isNaN(value) === false) {
						return true;
					}
					return false;
				}
			}, {
				name: "quantity",
				type: "input",
				message: "How many units would you like to purchase?",
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
			if (quantityInt <= chosenItem.stock_quantity) {
				connection.query("UPDATE products SET ? WHERE ?", [{
					stock_quantity: chosenItem.stock_quantity - quantityInt
				}, {
					item_id: chosenItem.item_id
				}], function(error, response) {
					if (error) throw error;
					console.log("Your order of " + quantityInt + " " + chosenItem.product_name + " has been placed! The total cost is $" + quantityInt * chosenItem.price + ".")
					order();
				})
			} else {
				console.log("Insufficient quantity!");
				order();
			}
		});
	});
};

order();

