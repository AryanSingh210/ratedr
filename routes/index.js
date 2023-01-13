var express = require('express');
var router = express.Router();
var fs = require('fs');
var nodemailer = require('nodemailer')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.get('/about', function(req, res, next) {
    res.render('about');
});

router.get('/contact', function(req, res, next) {
    res.render('contact')
});

router.get('/events', function(req, res, next) {
    res.render('gallery')
});

router.post('/submit', function(req, res, next) {
    console.log(req.body)
    let name = req.body.name;
    let email = req.body.email;
    let number = req.body.number;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aryanjaat210@gmail.com',
            pass: 'paiingczjqjjjnte'
        }
    });
    var mailoptions = {
        from: 'ratedr@gmail.com',
        to: email,
        subject: 'successfully tickets booked',
        text: 'Congratulations! You have successfully booked the tickets for the upcoming event...'
    };
    transporter.sendMail(mailoptions, function(err, info) {
        if (err) {
            console.log(err)
        } else {
            let data = `name:${name},email:${email},number:${number}\n`;
            fs.appendFile('data.txt', data, function(err) {
                if (err) {
                    console.log(err)
                } else {
                    res.render('success')
                }
            });
        }
    })

});


module.exports = router;