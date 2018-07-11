const _ = require('lodash');
const express = require('express');
const router = express.Router();
const User = require('./../../models/users');
const validateUser = require('./validate');
const checkIfExists = require('./checkIfExists');
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
        .then((ans) =>  {
            const result = ans;
            if(!result) {
                let stat = 200;

                const user = new User(_.pick(req.body, ['username', 'email', 'password', 'device_id', 'device_type', 'device_password', 'created']));

                hashFunction(user.password,saltGenRounds)
                    .then((password) => {
                        user.password = password;
                        console.log('This username and email has not been registered yet!');
                        console.log('Checking for device information...');
                        hashFunction(user.device_password,saltGenRounds)
                            .then((device_password) => {
                                user.device_password = device_password;
                                user.save()
                                    .then((ans) => {
                                        console.log(_.pick(ans, ['username', 'email', 'device_id', 'device_type', 'created']));
                                        let response = 'Congratulations, this username and email is not registered!' + '\nRegistering user details...' + '\nRegistering device...';                
                                        res.status(stat).send(response);
                                    })
                                    .catch((err) => {
                                        console.log('Error inserting document: ' + err);
                                        let response = 'Could not save document!';
                                        res.status(stat).send(response);
                                    });
                            })
                            .catch((err) => console.log(err));
                            let response = 'Incomplete/incorrect device information!';
                            // res.status(stat).send(response);
                    })
                    .catch((err) => {
                        console.log(err);
                        let response = 'Sorry. Could not register!';
                        console.log(response);
                        // res.status(stat).send(response);
                    });

            }
            else {
                let stat = 400;
                let response = 'This combination of username, email and device already exists :( \nTry again!';
                console.log(response);
                res.status(stat).send(response);
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;