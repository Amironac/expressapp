//  Registration

const mongoose = require("mongoose");

var nameSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmpassword:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    ethnicity:{
        type: String,
        required: true
    } 

  });

var User = mongoose.model("User", nameSchema);

module.exports = User;