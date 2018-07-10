const express = require('express');
const router = express.Router();
const User = require('./../../models/users');
const validateUser = require('./validate');
const checkIfExists = require('./checkIfExists');

router.use(express.json());

router.post('/',(req,res) => {
    const ans = validateUser(req.body);
    if(ans) status = 200
    else status = 400;

    console.log('Registration information: \n' , req.body);

    checkIfExists(req.body)
        .then((ans) =>  {
            const result = ans;
            if(!result) {
                let stat = 200;
                let response = 'Congratulations, this username and email is not registered!' + '\nRegistering user details...';
                console.log(response);

                const user = new User({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email
                });

                user.save()
                    .then((ans) => {
                        console.log(ans);
                    })
                    .catch((err) => {
                        console.log('Error inserting document: ' + err);
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