const mongoose = require("mongoose");

let UserSchema = mongoose.Schema({
    'userName': String,
    'password': String,
    'contact': String 
})

exports.User = mongoose.model('user', UserSchema)