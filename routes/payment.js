var express = require('express');
var router = express.Router();
var mongoose = require('../db/schemas');
var transactionSchema = mongoose.model('transaction');
var userSchema = mongoose.model('user');
var axios = require('axios');

router.get('/all', (req, res) => {
    transactionSchema.find().exec().then(data => {
        res.status(200).send(data).end();
    }).catch(err => {
        res.send(404).send(err).end();
    })
});

router.post('/make-payment', (req, res) => {
    let URL = null;
    if (req.body.isCardPayment === true) {
        URL = "http://localhost:3002/payment/make-payment"; // Sampath Bank Server URL
    } else {
        URL = "http://localhost:3003/payment/make-payment"; // Dialog Server URL
    }
    axios({
        method: 'post',
        url: URL,
        data: req.body,
        config: { headers: { 'Content-Type': 'application/json' } }
    }).then(x => {
        res.status(200).send({ paid: true }).end(); // {paid : true}
        userSchema.find({ username: req.body.username }).then(data => {
            let User = new userSchema(data[0]);
            User.points = User.points + (req.body.amount / 100);
            User.save();
        });
    });
});

module.exports = router;