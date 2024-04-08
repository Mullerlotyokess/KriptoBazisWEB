require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

var db_modul = require('./modules/database');
var file_modul = require('./modules/fileupload');
var email_modul = require('./modules/email');



// MIDDLEWARE FUNCTION

app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(express.json());

app.use('/db', db_modul);
app.use('/file', file_modul);
app.use('/email', email_modul);

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



  
app.listen(port, () => {
    console.log(`Server running on: ${port} port`);
});