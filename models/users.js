const mongoose = require('mongoose');
const min_max = require('./../routes/credentials/schema_validity');
const devices= require('./../routes/credentials/devices');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
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
        minlength: min_max.email_min,
        maxlength: min_max.email_max,
        email: true
    },
    device_id: {
        type: String,
        required: true,
        minlength: min_max.device_id_min,
        maxlength: min_max.device_id_max
    },
    device_type: {
        type: String,
        required: true,
        enum: devices
    },
    device_password: {
        type: String,
        required: true,
        minlength: min_max.device_password_min,
        maxlength: min_max.device_password_max,
        password: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user',userSchema);

module.exports= User;