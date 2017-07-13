var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var table = new Table({ head: ["Item ID number", "Product Name", "Price"] });

var availability = true;



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
  connection.query("SELECT * FROM products", function(err, res) {

    for (i = 0; i < res.length; i++) {

        table.push([res[i].item_id, res[i].product_name, res[i].price]);
    }
    if (err) throw err;

    console.log(table.toString());

    customerInput();

  });
}

// function which prompts the user for what action they should take

   // * The first should ask them the ID of the product they would like to buy.
   // * The second message should ask how many units of the product they would like to buy.
function customerInput() {

  inquirer
    .prompt([{
      name: "product_id",
      type: "input",
      message: "What is the ID of the product that you would like to buy?"
    },
    {
      name: "quantity",
      type: "input",
      message: "How many units would you like to buy?"

    }])
    .then(function(answer) { 

      var availability = true;

        // Check to see if the item is available
        connection.query("SELECT * FROM products where stock_quantity > 0", function(err, res) {
              if (res[0].length > 0) {
                  console.log("The number of results is " + res[0].length);
              }   
        });

        connection.query("SELECT * FROM products where item_id = " + answer.product_id, function(err, res) {

          if (err) throw err;

          // Check to see if there are enough items available
          if(answer.quantity > res[0].stock_quantity) {
              console.log("There are only " + res[0].stock_quantity + " items available");
              customerInput();
          }
          else {
              var newAmount = res[0].stock_quantity - answer.quantity;
              updateDatabase(answer.product_id, newAmount);
              displayTotal(answer.quantity*res[0].price);
              connection.end();
          }
        });

    });
}

// This function updates the database with a new quantity after the customer purchases the items
function updateDatabase(id, quantity) {
  
  var sql = "UPDATE products SET stock_quantity = " + quantity + " WHERE item_id = " + id + "";
  connection.query(sql, function(err, res) {
    if (err) throw err;
  });


}

function displayTotal(total) {
  console.log("Your total is $" + total + ".");
  console.log("Thank you for buying from Bamazon!");
}

