
const Joi = require('@hapi/joi');

const registerValidation=(data)=>{
    const schema={
    username:Joi.string().trim().min(3).max(12).required(),
    password:Joi.string().min(8).max(32).regex(/(?=.*[A-Z])(?=.*[a-z])/).required(),
    email:Joi.string().email().required()}
    return Joi.validate(data,schema);
}

const loginValidation=(data)=>{
    const schema={
    email:Joi.string().trim().required(),
    password:Joi.string().required()
}
    //email:Joi.string().email().required()}
    return Joi.validate(data,schema);
}


module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;