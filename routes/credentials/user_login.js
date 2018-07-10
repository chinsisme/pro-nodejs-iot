const _ = require('lodash');
const express = require('express');
const router = express.Router();
const validateUser = require('./validate');
const checkLogin = require('./checkLogin');

router.use(express.json());


router.post('/',(req,res) => {
    const ans = validateUser(req.body);
    if(ans) status = 200
    else status = 400;
    // res.status(status).send(req.body);

    console.log('Login information: \n' , req.body);

    checkLogin(req.body)
        .then((ans) =>  {
            const result = ans;
            if(result) {
                let stat = 200;
                let response = 'You\'re now logged in! \np.s.- Not really :p';
                console.log(response);
                res.status(stat).send(response);
            }
            else {
                let stat = 400;
                let response = 'Wrong credentials. Try again!';
                console.log(response);
                res.status(stat).send(response);
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;