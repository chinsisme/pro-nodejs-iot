const express = require('express');
const User = require('./../../models/users');

module.exports = async function checkIfUserExists(info){
    try{
        let result = await User.findOne({ username: info.username, email: info.email, device_id: info.device_id});
        return result;
    }
    catch(err){
        console.log(err);
    }
}