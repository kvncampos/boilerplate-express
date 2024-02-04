// ** LOAD ENVIRONMENT VARIABLES FROM .ENV **
require('dotenv').config()

// -------------------------------------------------------
// ** LOAD ENVIRONMENT VARIABLES FROM .ENV **
let express = require("express");
let app = express();
let bodyParser = require('body-parser');
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
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
// 

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
    // response = "Hello json".toUpperCase();
    response = "HELLO JSON";
  } else {
    response = "Hello json";
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


// ---------------------------------------------------------
// ** Get Route Parameter Input from the Client **
app.get('/:word/echo', 
    (req, res, next) => {
        req.word = req.params.word; // Declare word using req.word
        next();
    },
    (req, res) => {
        res.json({
            'echo': req.word, // Access word second function
        });
    }
);
// ---------------------------------------------------------
// ** Use body-parser to Parse POST Requests **
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
// ** Get Query Parameter Input from the Client **
app.route('/name')
.get((req, res) => {
    if (req.query.first === undefined || req.query.last === undefined){
        res.status(400).json({
            error: 'Both "first" and "last" parameters are required.'
          });
    }
    else {
        let firstName = req.query.first;
        let lastName = req.query.last;
        console.log(firstName, lastName)
        res.json({
            'first': firstName,
            'last': lastName
        });
        }
    })
    .post((req, res) => {
        var { first: firstName, last: lastName } = req.body;
    
        if (!firstName || !lastName) {
            return res.status(400).json({
                error: 'Both "first" and "last" parameters are required.'
            });
        }
    
        res.json({
            name: `${firstName} ${lastName}`
        });
    });
    

// ---------------------------------------------------------
// ** Get Data from POST Requests **



// console.log("Hello World");
module.exports = app;
