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
    const ans = validateUser(req.body);
    if(ans) status = 200
    else status = 400;

    console.log('Registration information: \n' , _.pick(req.body, ['username', 'email']));

    checkIfExists(req.body)
        .then((ans) =>  {
            const result = ans;
            if(!result) {
                let stat = 200;
                let response = 'Congratulations, this username and email is not registered!' + '\nRegistering user details...';
                console.log(response);

                const user = new User(_.pick(req.body, ['username', 'email', 'password']));

                hashFunction(user.password,saltGenRounds)
                    .then((password) => {
                        user.password = password;
                        user.save()
                            .then((ans) => {
                                console.log(_.pick(ans, ['username', 'email']));
                            })
                            .catch((err) => {
                                console.log('Error inserting document: ' + err);
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                    })

                

                

                res.status(stat).send(response);
            }
            else {
                let stat = 400;
                let response = 'This username or email already exists :( \nTry again!';
                console.log(response);
                res.status(stat).send(response);
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;