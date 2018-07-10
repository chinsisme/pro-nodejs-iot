const Joi = require('joi');
const min_max = require('./schema_validity');

module.exports= function validateUser(user){
    const schema = {
        username: Joi.string().min(min_max.username_min).max(min_max.username_max).required(),
        password: Joi.string().min(min_max.password_min).max(min_max.password_max).required(),
        email: Joi.string().min(min_max.email_min).max(min_max.email_max).required().email()    
    };

    return Joi.validate(user,schema);
}