require("dotenv").config();
const express = require("express");
var mysql = require("mysql");

const app = express();
const port = process.env.PORT;
const cors = require("cors");
const axios = require('axios');

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASS,
    database        : process.env.DBNAME,
    timezone        : 'UTC'
});

// MIDDLEWARE FUNCTION

app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
    res.send("Backend API get /");
});

app.get('/:crypto', (req, res) => {
    const crypto = req.params.crypto
    // URL BRINGS BACK ALL INFO OF THE TOKEN 
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${crypto}`
    // URL2 BRINGS BACK THE CURRENT QUOTE AND PRICE DATA
    const url2 = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}`
  
    request.get({
      url: url2,
      json: true,
      headers: {
        'X-CMC_PRO_API_KEY': '7902d9b3-8a32-4a60-ab3d-ec68cae957e8'
      }
    }, (error, response, data) => {
  
      if (error) {
        return res.send({
          error: error
        });
      }
  
      res.send({
        data: data
      });
  
    });
  
  });

app.get();


function getOperator(op){
  switch (op){
      case "eq": op = "=";break;
      case "lt": op = "<";break;
      case "gt": op = ">";break;
      case "lte": op = "<=";break;
      case "gte": op = ">=";break;
      case "not": op = "!=";break;
      case "lk": op = "like";break;
  }
  return op
}
  
app.listen(port, () => {
    console.log(`Server running on: ${port} port`);
});