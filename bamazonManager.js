// * Create a new Node application called `bamazonManager.js`. Running this application will:

var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table');


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  afterConnection();

});


// function which reads everything in the database
function afterConnection() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [

      //   * List a set of menu options:
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "End Program",
      ]
    })
      .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          viewProducts();
          afterConnection();
          break;

        case "View Low Inventory":
          viewLow();
          afterConnection();
          break;

        case "Add to Inventory":
          updateInventory();
          //afterConnection();
          break;

        case "Add New Product":
          addProduct();
          break;

        case "End Program":
          connection.end();
          break;
      }
    });
}

//   * If a manager selects `View Products for Sale`, the app should list every available item: 
//    the item IDs, names, prices, and quantities.
function viewProducts() {

	var table = new Table({ head: ["Item ID number", "Product Name", "Price", "Quantity"] });

	connection.query("SELECT * FROM products", function(err, res) {

    for (i = 0; i < res.length; i++) {

        table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]);
    }
    if (err) throw err;

    console.log(table.toString());

});
}

//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory 
//    count lower than five.
function viewLow() {

	var table = new Table({ head: ["Item ID number", "Product Name", "Price", "Quantity"] });

	connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {

    for (i = 0; i < res.length; i++) {

        table.push([res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]);
    }
    if (err) throw err;

    console.log("\n");
    console.log(table.toString());

});
}

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let 
//    the manager "add more" of any item currently in the store.
function updateInventory() {

	// Ask the manager what item id to update
	inquirer
    .prompt([{
      name: "item",
      type: "input",
      message: "What item Id would you like to update?",
    },
    {
      name: "units",
      type: "input",
      message: "How many units would you like to add to the inventory?",

    }])
      .then(function(answer) {

      	updateDatabase(answer.item, answer.units);
     });

}

function addProduct() {

	// Ask the manager the details of the new item
	inquirer
    .prompt([{
      name: "item_name",
      type: "input",
      message: "What is the name of the product that you would like to add?",
    },
    {
      name: "department",
      type: "input",
      message: "What is the name of the department that this item belongs to?",

    },
    {
      name: "cost",
      type: "input",
      message: "What is the cost of one unit?",

    },
    {
      name: "quantity",
      type: "input",
      message: "How many units are available?",

    }])
      .then(function(answer) {

      	insertInventory(answer.item_name, answer.department, answer.cost, answer.quantity);
     });

}

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely 
//   new product to the store.
function insertInventory (item, department, cost, quantity) {
	
	var sql = "INSERT INTO products (product_name, department_name, price, stock_quantity)" +
	"VALUES ('" + item + "', '" + department + "', " + cost + ", " + quantity + ")";
	  connection.query(sql, function(err, res) {
    if (err) throw err;

    console.log("Inventory has been updated.");
    afterConnection();
  });


}

function updateDatabase (id, units) {

	var sql = "UPDATE products SET stock_quantity = stock_quantity + " + units + " WHERE item_id = " + id + "";
	 connection.query(sql, function(err, res) {
	    if (err) throw err;

	    console.log("Quantitiy updated.");
	    afterConnection();
	  });
}






