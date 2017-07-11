var mysql = require("mysql");
//var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  //database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  connection.query("CREATE DATABASE bamazon_DB", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

});

