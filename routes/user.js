const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./../models/users');
const auth = require('./../middleware/auth');
const isAdmin = require('./../middleware/isAdmin');

router.use(express.json());

router.get('/me', auth, isAdmin, async (req, res) => {
    //Check if request contains correct Object ID in the database
    const idObj = mongoose.Types.ObjectId(req.user._id);
    User
        .findById(idObj,(err,msg) => {
            if(err){
                console.error(err);
                res.status(400).send(err);
            }
            else {
                console.log('Details of authenticated user sent!');
                console.log(msg.username);
                res.status(200).send(msg);
            }
        })
        .select('-password -device.device_password -_id -device._id')
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        })
});


module.exports = router;