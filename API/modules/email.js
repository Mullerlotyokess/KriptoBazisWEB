const router = require('express').Router();
var nodemailer = require('nodemailer');


var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

router.post('/send', (req, res)=>{

    var mailOptions = {
        from: process.env.SMTP_USER,
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.message
    }

    transport.sendMail(mailOptions, (err, info)=>{
        if (err) {
            console.log((`E-mail küldés sikertelen! - ${err}`));
        }else
        {
            console.log((`E-mail küldés sikeres! - ${info}`));
        }
    });

    res.send('Email elküldve...');
});

module.exports = router;