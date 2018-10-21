var express = require("express");
var bodyParser = require("body-parser");
var path = require("path")
var app = express();

// require routing files from app folder
var htmlroute = require(path.join(__dirname, "app/routing/htmlRoutes.js"))

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

app.use(express.static("app/public"))

// app.use('public', express.static(__dirname + "./app/public"));

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);



// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });