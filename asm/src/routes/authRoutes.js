const express = require('express');
const User = require('../models/User');
const authController = require('../controllers/authController');
const authRouter = express.Router();

//register route
authRouter.post('/register',authController.register);

authRouter.post('/login',authController.login);

module.exports=authRouter;
