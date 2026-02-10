const User = require("../models/User");
const logEvent = require("../services/audit.service");
const AuthError = require("../utils/errors/AuthError");
const NotFoundError = require("../utils/errors/NotFoundError");
const generateToken = require("../utils/generateToken");
const bcrypt = require('bcrypt');


exports.register = async (req, res, next) => {
  try {
    const { email, firstName, userName, lastName, password } = req.body;

    // Check if the user with the userName exists
    const userNameExists = await User.findOne({
      where: { userName },
    });

    if (userNameExists) {
      throw new AuthError("UserName already exists")
    }

    const user = await User.create({
      email,
      userName,
      firstName,
      lastName,
      password,
    });

    const safeUser = await User.findByPk(user.id);

    res.status(201).json({
      success: true,
      message: "User registered Successfully",
      user: safeUser,
    });

  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    console.log("req.body",req.body);
    
    const user = await User.scope("withPassword").findOne({
      where: { userName },
    });
    if (!user) {
      await logEvent({
        userId:99999,
        action:'LOGIN_FAILED',
        entityType:'AUTH',
        ip:req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        metadata:{"userName":userName}
      })
      throw new AuthError("User not found");
    }
    const compare =await bcrypt.compare(password,user.password);
    console.log("Compare Status:",compare);
    
    const isMatch = await user.comparePassword(password);
    // console.log("is same :",comparePassword);
    if (!isMatch) {
      throw new AuthError("Incorrect Password");
    }

    const token = generateToken(user);

    await logEvent({
      userId:user.id,
      action:'LOGIN_SUCCESS',
      entityType:'AUTH',
      ip:req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      metadata:{
        "email":user.email,
        "userAgent":req.headers['user-agent']
      }
    })


    res.status(200).json({
      token,
      user:{
        id:user.id,
        email:user.email,
        role:user.role
      }
    });

    // console.log("Fetched User form DB :",user);
    // res.status(200).json({ success: true, message: "login Success" });
  } catch (error) {
    next(error);
  }
};
