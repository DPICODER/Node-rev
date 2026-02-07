const joi = require('joi');

/**
 * Validation schemas for auth routes
 */

const registerSchema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).required(),
    userName:joi.string().min(5).required(),
    firstName:joi.string().min(3).required(),
    lastName:joi.string().min(3).required(),
    role:joi.string().valid('user','admin').optional()

});

const loginSchema = joi.object({
    userName: joi.string().min(5).required(),
    password: joi.string().required()
});

module.exports = {registerSchema,loginSchema}