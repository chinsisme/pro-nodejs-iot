const Joi = require('joi');
const min_max = require('./schema_validity');

module.exports= async function validateUser(user){
    const schema = {
        username: Joi.string().min(min_max.username_min).max(min_max.username_max).required(),
        password: Joi.string().min(min_max.password_min).max(min_max.password_max).required(),
        email: Joi.string().min(min_max.email_min).max(min_max.email_max).required().email(),
        device_id: Joi.string().min(min_max.device_id_min).max(min_max.device_id_max).required(),
        device_type: Joi.string().min(min_max.device_type_min).max(min_max.device_type_max).required(),
        device_password: Joi.string().min(min_max.device_password_min).max(min_max.device_password_max).required(),
        isAdmin: Joi.boolean(),
        created: Joi.date()
    };

    return await Joi.validate(user,schema);
}