var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var drugsRouter = require('./routes/drug');
var userRouter = require('./routes/user');
var paymentRouter = require('./routes/payment');

let mongoose = require('./db/db_config')
var userSchema = mongoose.model('user')
var drugSchema = mongoose.model("drug")

userSchema.deleteMany({}).then(data => {
  drugSchema.deleteMany({}).then(data => {
    let user = new userSchema({
      username: "admin",
      password: "admin",
      name: "admin",
      points: 0
    })
    user.save().then(data => {
      drugSchema.insertMany([
        { name: "Panadol", price: 5.00, quantity: 120.00 },
        { name: "Piriton", price: 30.00, quantity: 74.00 },
        { name: "Aspirin", price: 20.00, quantity: 50.00 },
        { name: "Amoxicillin", price: 10.00, quantity: 25.00 },
        { name: "Plavix", price: 750.00, quantity: 0.00 },
        { name: "Abilify", price: 20.00, quantity: 50.00 },
        { name: "Singulair", price: 25.55, quantity: 55.00 },
        { name: "Epogen", price: 15.00, quantity: 33.00 },
        { name: "Nexium", price: 55.00, quantity: 12.00 },
        { name: "Seroquel", price: 17.50, quantity: 10.00 },
      ]).then(data => {

      }).catch(error => {

      })
    }).catch(error => {

    })
  }).catch(error => {

  })
}).catch(error => {

})




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/drugs', drugsRouter);
app.use('/user', userRouter);
app.use('/payment', paymentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
