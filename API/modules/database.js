const router = require('express').Router();
var mysql = require('mysql');
var {getOperator, tokencheck} = require('./functions');
var jwt = require('jsonwebtoken');
require("dotenv").config();
var mysql = require("mysql");


var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DBHOST,
  user            : process.env.DBUSER,
  password        : process.env.DBPASS,
  database        : process.env.DBNAME,
  timezone: 'UTC'
});


// ENDPOINTS

router.get('/', function (req, res) {
    res.send('Simpe NodeJS Backend API');
});
  
router.get('/:crypto', (req, res) => {
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

module.exports =  router;