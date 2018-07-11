const _ = require('lodash');
const express = require('express');
const router = express.Router();
const User = require('./../../models/users');
const validateUser = require('./validate');
const checkIfExists = require('./checkIfExists');
const checkIfUserExists = require('./checkIfUserExists');
const hashFunction = require('./hash');

const saltGenRounds = 10;

router.use(express.json());

router.post('/',(req,res) => {
    validateUser(req.body)
        .then(() => {
            console.log('Request information fits the requirement...');
        })
        .catch((err) => {
            res.status(400).send(err.name + ': ' + err.details[0].message);
        });

    console.log('Registration information: \n' , _.pick(req.body, ['username', 'email', 'device_id', 'device_type']));

    checkIfExists(req.body)
        .then((ans) => {
            //If the exact user-device document exists, say that this user-device already exists.
            // console.log(JSON.stringify(ans));
            if(ans) {
                console.log('This user-device already exists!');
                res.status(400).send('This user-device already exists!');
            }
            //If the user-device document does not exist.
            else {
                checkIfUserExists(req.body)
                    .then((ans) => {
                        if(ans) {
                            //If the user exists but the device does not, push the new device details into the document.
                            let unHashedDevicePassword = req.body.device_password;

                            hashFunction(unHashedDevicePassword,saltGenRounds)
                                .then((hashedDevicePassword) => {
                                    User.findOneAndUpdate({
                                        _id: ans._id
                                    },{
                                        $push: {
                                            device: {
                                                device_id: req.body.username + '_' + req.body.device_id,
                                                device_type: req.body.device_type,
                                                device_password: hashedDevicePassword
                                            }
                                        }
                                    })
                                        .then((ans) => {
                                            let response = 'New device added to username: ' + ans.username + '\n' + JSON.stringify(ans);
                                            console.log(response);
                                            res.status(200).send(response);
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        })
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }
                        else {
                            //If the user does not exist.
                            let unHashedUserPassword = req.body.password;
                            let unHashedDevicePassword = req.body.device_password;
                            
                            hashFunction(unHashedUserPassword,saltGenRounds)
                                .then((hashedUserPassword) => {
                                    hashFunction(unHashedDevicePassword,saltGenRounds)
                                        .then((hashedDevicePassword) => {
                                            const user = new User({
                                                username: req.body.username,
                                                email: req.body.email,
                                                password: hashedUserPassword,
                                                device: {
                                                    device_id: req.body.device_id,
                                                    device_password: hashedDevicePassword,
                                                    device_type: req.body.device_type
                                                }
                                            });

                                            user.save()
                                                .then((ans) => {
                                                    // console.log(_.pick(ans, ['username', 'email', 'device.device_id', 'device.device_type']));
                                                    let response = 'New user added : ' + ans.username + '\n' + JSON.stringify(ans);
                                                    console.log(response);
                                                    res.status(200).send(response);
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                })
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        })
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                        }

                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send(err);
        })
});

module.exports = router;