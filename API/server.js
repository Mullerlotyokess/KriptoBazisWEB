require("dotenv").config();
const express = require("express");
var mysql = require("mysql");

const app = express();
const port = process.env.PORT;
const cors = require("cors");
const axios = require('axios');

var pool  = mysql.createPool({
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

app.get("https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=X-CMC_PRO_API_KEY':'"+env.APIKEY, (req, res) => {
    console.log(res.data)
});


app.listen(port, () => {
    console.log(`Server running on: ${port} port`);
});