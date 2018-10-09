var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/drugs_store', (err) => {
    if (err) {
        console.log("Error connecting to database");
        process.exit(-1);
    }
    console.log("Connected to database");
})

module.exports = mongoose;