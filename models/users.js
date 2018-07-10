const mongoose = require('mongoose');
const min_max = require('./../routes/credentials/schema_validity');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        },
        minlength: min_max.username_min,
        maxlength: min_max.username_max
    },
    password: {
        type: String,
        required: true,
        minlength: min_max.password_min,
        maxlength: min_max.password_max,
        password: true
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        },
        minlength: min_max.email_min,
        maxlength: min_max.email_max,
        email: true
    }
});

const User = mongoose.model('user',userSchema);

module.exports= User;