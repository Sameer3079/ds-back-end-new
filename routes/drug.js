var express = require('express');
var router = express.Router();
var mongoose = require('../db/schemas');
var drugSchema = mongoose.model("drug");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/get-drugs', (req, res) => {
  // Fetch data from the database
  drugSchema.find().exec().then((data) => {
    res.status(200).send(data).end();
  }).catch((err) => {
    res.status(404).send({ message: "Error Fetching Data", error: err }).end();
  });
});

router.post('/add-drug', (req, res) => {
  let drug = new drugSchema({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity
  });
  drug.save().then((data) => {
    res.status(201).send({ message: "Added Drug" }).end();
  }).catch((err) => {
    res.status(404).send({ message: "Error Adding Drug", error: err }).end();
  })
});

module.exports = router;
