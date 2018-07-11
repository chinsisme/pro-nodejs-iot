const express = require('express');
const User = require('./../../models/users');

module.exports = async function (info){
    try{
        const result = User.findOne({ 
            username: info.username, 
            email: info.email, 
            "device.device_id": info.device_id 
        })
                .then((ans) => {
                    // console.log(ans);
                    // console.log(info.username);
                    return ans;
                })
                .catch((err) => {
                    console.log(err);
                });
        return result;
        
    }
    catch(err){
        console.log(err);
    }
}