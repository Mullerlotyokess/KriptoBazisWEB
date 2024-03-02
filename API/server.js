require("dotenv").config();
const express = require("express");
var mysql = require("mysql");

const app = express();
const port = process.env.PORT;
const cors = require("cors");

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

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});