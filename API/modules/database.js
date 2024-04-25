const router = require('express').Router();
var mysql = require('mysql');
var {getOperator, tokencheck} = require('./functions');
var jwt = require('jsonwebtoken');
require("dotenv").config();
var mysql = require("mysql");
const { response } = require('express');
const axios  = require('axios');
const request = require('request')
var CryptoJS = require("crypto-js");


// Adatbázis
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DBHOST,
  user            : process.env.DBUSER,
  password        : process.env.DBPASS,
  database        : process.env.DBNAME,
  timezone: 'UTC'
});


// Endpointok

router.get('/', function (req, res) {
    res.send('Simpe NodeJS Backend API');
});

// Crypto adatok lekérése coin alapján
router.get('/get_crypto_data/:crypto', (req, res) => {
    const crypto = req.params.crypto
    
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${crypto}`
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

// Felhasználó adatainak feltöltése
router.post("/users", (req,res) => {
  pool.query(`INSERT INTO users VALUES (null, '${req.body.username}', '${req.body.email}', '${req.body.pass}, 'user')`, (err, results) => {
      if (err) return res.send({ message: 'Hiba történt!' }) 
      res.send({ message: 'Sikeres adatfelvétel.', data: results})
    
  });
});

// Felhasználó adatainak lekérése
router.get("/users", (req, res) => {
  pool.query(`SELECT * FROM users`, (err, results) => {
    if (err) return res.send({ message: 'Hiba történt!' })
    res.send({ message: 'Sikeres felhasználók lekérése.', data: results })
  });
});


// megadott Email-cím lekérése
router.get("/users/email/:op/:value", (req,res) => {
    let value = req.params.value;
    let op = getOperator(req.params.op);
    pool.query(`SELECT email FROM users WHERE email ${op} '${value}'`, (err, results) =>{
      if (err) return res.send({message: 'Hiba történt!'}) 
      res.send({message: 'Sikeres adatkérés.', data: results})
    })
});

// megadott ID alapján adat lekérése
router.get("/users/ID/:op/:value", (req,res) => {
    let value = req.params.value;
    let op = getOperator(req.params.op);
    pool.query(`SELECT * FROM users WHERE ID ${op} '${value}'`, (err, results) =>{
      if (err) return res.send({message: 'Hiba történt!'}) 
      res.send({message: 'Sikeres adatkérés.', data: results})
    })
});

//Bejelentkezés validálása
router.post('/logincheck', (req, res)=>{

    let table = 'users';
    let field1 = 'email';
    let field2 = 'pass';
    let value1 = req.body.email;
    let value2 = req.body.pass;
   

    pool.query(`SELECT * FROM ${table} WHERE ${field1}='${value1}' AND ${field2}='${value2}'`, (err, results)=>{

       if (results.length > 0){
           let user = {
               ID: results[0].ID,
               name: results[0].username,
               email: results[0].email,
               privilege: results[0].privilege
            }   
            results[0] ={ token: jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})};
        }
        else
        {
            results[0] = { token: '' }
        }
        if (err) return res.send({message: 'Hiba történt!'}) 
        res.send({message: 'Sikeres adatkérés.', data: results})
    });
});

//hírek feltöltése adatbázisba
router.post('/news', (req, res) =>{
    pool.query(`INSERT INTO news VALUES (null, '${req.body.title}', '${req.body.author}', '${req.body.content}', '${req.body.date}')`, (err, results) => {
        if (err) return res.send({message: 'Hiba történt!'}) 
        res.send({message: 'Sikeres adatfelvétel.', data: results})
    
    });
})


//hírek lekérése adatbázisból
router.get('/news', (req, res) =>{
    pool.query(`SELECT title, author, content, date FROM news`, (err, results) =>{
        if (err) return res.send({message: 'Hiba történt!'}) 
        res.send({message: 'Sikeres adatkérés.', data: results})
    })
})

//profil adatok feltöltése
router.post('/profiles', (req, res) =>{
  pool.query(`INSERT INTO profiles VALUES (null, '${req.body.loggedUserID}', '${req.body.nickname}', '${req.body.statusmsg}', '${req.body.location}', '${req.body.social}')`, (err, results) => {
      if (err) return res.send({message: 'Hiba történt!'}) 
      res.send({message: 'Sikeres adatfelvétel.', data: results})
  
  });
})

pool.getConnection((err, connection) =>{
  if (err) {
      return err;
  }
  console.log("Sikeres csatlakozás")
})

module.exports = router;