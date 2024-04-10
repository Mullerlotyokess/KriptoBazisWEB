const router = require('express').Router();
var mysql = require('mysql');
var {getOperator, tokencheck} = require('./functions');
var jwt = require('jsonwebtoken');
require("dotenv").config();
var mysql = require("mysql");
const { response } = require('express');
const axios  = require('axios');
const request = require('request')

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
        'X-CMC_PRO_API_KEY': process.env.APIKEY
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


router.post("/users", (req,res) => {

  pool.query(`INSERT INTO users VALUES (null, '${req.body.username}', '${req.body.email}', '${req.body.pass}')`, (err, results) => {
      
  });
});

router.get("/users", (req, res) => {
  console.log(req)

  pool.query(`SELECT * FROM users`, (err, results) => {
    if (err) return res.send({ message: 'Hiba történt!' })

    res.send({ message: 'Sikeres felhasználók lekérése.', data: results })
  });
});

pool.getConnection((err, connection) =>{
  if (err) {
      return err;
  }
  console.log("Sikeres csatlakozás")
})

module.exports =  router;