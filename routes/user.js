var express = require('express');
var router = express.Router();
var mongoose = require('../db/schemas');
var userSchema = mongoose.model('user');

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    var status = false;
    var length, data;
    userSchema.find({ username: username, password: password }).exec().then((data) => {
        if (data.length > 0) {
            res.status(200).send({ status: true, user: data[0] }).end();
        } else {
            res.status(200).send({ status: false }).end();
        }
    }).catch((err) => {
        res.status(404).send({ message: "Error Fetching Data", error: err }).end();
    });
});

router.post('/add-user', (req, res) => {
    let User = new userSchema({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        points: req.body.points
    });
    User.save().then((data) => {
        res.status(201).send({ message: "Added User" }).end();
    }).catch((err) => {
        res.status(404).send({ message: "Error Adding User", error: err }).end();
    })
})

module.exports = router;
