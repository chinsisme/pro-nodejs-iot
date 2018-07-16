const express = require('express');
const app = express();
const register = require('./routes/credentials/register');
const user = require('./routes/user');
const mongoose = require('mongoose');
const port = process.env.port || 3000 ;
const mCred = require('./routes/credentials/mongo');

app.use(express.json());
app.use('/api/register', register); //Register user
app.use('/api/user', user);


// const mongo_uri_long = 'mongodb://' + mCred.username + ':' + mCred.password + '@' + mCred.host + ':' + mCred.port + '/' + mCred.database;
const mongo_uri_short = 'mongodb://' + mCred.host + '/' + mCred.database;

// console.log(mongo_uri_short);
mongoose.connect(mongo_uri_short)
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log('Listening on port ' + port);
});