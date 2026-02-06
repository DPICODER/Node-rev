const express = require('express');
const User = require('../models/User');
const authController = require('../controllers/authController');
const { valid } = require('joi');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const authRouter = express.Router();

//register route
authRouter.post('/register',validate(registerSchema),authController.register);

authRouter.post('/login',validate(loginSchema),authController.login);

module.exports=authRouter;
