// ** LOAD ENVIRONMENT VARIABLES FROM .ENV **
require('dotenv').config()

// -------------------------------------------------------
// ** LOAD ENVIRONMENT VARIABLES FROM .ENV **
let express = require("express");
let app = express();

// -------------------------------------------------------
// ** IMPLEMENT A ROOT-LEVEL REQUEST LOGGER MIDDLEWARE **
app.use((req, res, next) => {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string)
  next()
}
)

// -------------------------------------------------------
// ** SENDING STRING TO '/' **
// app.get("/", (req, res) => {
  // res.send("Hello Express");
// });
// 

// --------------------------------------------------------
// ** SERVE AN 'HTML' FILE **
// app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/views/index.html");
// });

app.get("/", (req, res) => {
  res.send("Hello Express");
  });

// ---------------------------------------------------------
// ** SERVE 'STATIC' ASSETS **
// Normal usage
// app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

// ---------------------------------------------------------
// ** SERVE 'JSON' TO A SPECIFIC ROUTE **
app.get('/json', (req, res) => {
  let response;
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "Hello World".toUpperCase();
  } else {
    response = "Hello World";
  }
  res.json({
    "message": response
  });
});

// ---------------------------------------------------------
// ** CHAIN MIDDLEWARE TO CREATE A TIME SERVER **
app.get('/now', 
    // adding a new property to req.time object
    // in the middleware function
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  }, 
  // accessing the newly added property
  // in the main function
  (req, res) => {
    res.json({
      "time": req.time,
    });
});


console.log("Hello World");
module.exports = app;
