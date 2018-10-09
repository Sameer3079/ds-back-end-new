var mongoose = require('./db_config');
const Schema = mongoose.Schema;

var drugSchema = new Schema({
    name: { type: "String", required: true },
    price: { type: "Number", required: true },
    quantity: {type: "Number", required: true} // Quantity available
});

var userSchema = new Schema({
    username: {type: "String", required: true},
    password: {type: "String", required: true},
    name: { type: "String", required: true },
    points: { type: "Number", required: true } // Loyalty Points
});

var transactionSchema = new Schema({
    username: {type: "String", required: true},
    date: {type: "Date", required: true},
    type: {type: "String", required: true}, // Credit Card / Mobile Phone Bill
    amount: {type: "Number", required: true}
});

var accountSchema = new Schema({
    accountNumber: {type: "Number", required: true},
    cardNumber: {type: "Number", required: true},
    CVC: {type: "Number", required: true},
    expiryDate: {type: "Date", required: true},
    balance: {type: "Number", required: true},
    holderName: {type: "String", required: true}
});

mongoose.model("drug", drugSchema, 'drugs');
mongoose.model("user", userSchema, 'users');
mongoose.model('account', accountSchema, 'accounts');
mongoose.model("transaction", transactionSchema, 'transactions');

module.exports = mongoose;
