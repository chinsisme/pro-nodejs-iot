const express = require('express');
const User = require('./../../models/users');

module.exports = async function checkIfExists(info){
    try{
        let result = await User.findOne({ username: info.username, email: info.email});
        return result;
    }
    catch(err){
        console.log(err);
    }
}