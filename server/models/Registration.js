const express = require('express');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const registrationModel = new schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});

module.exports = Registration = mongoose.model("myRegistration", registrationModel);
