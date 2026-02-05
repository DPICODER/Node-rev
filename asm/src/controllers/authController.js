const User = require("../models/User");

exports.register = async (req, res, next) => {
  try {
    const { email, firstName, userName, lastName, password } = req.body;

    // Check if the user with the userName exists
    const userNameExists = await User.findOne({
      where: { userName },
    });

    if (userNameExists) {
      const error = new Error("UserName already exists");
      error.statusCode = 400;
      throw error;
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
    const user = await User.scope("withPassword").findOne({
      where: { userName },
    });
    if (!user) {
      const error = new Error("Username not found");
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await user.comparePassword(password);
    // console.log("is same :",comparePassword);
    if (!isMatch) {
      const error = new Error("Incorrect Password");
      error.statusCode = 401;
      throw error;
    }

    // console.log("Fetched User form DB :",user);
    res.status(200).json({ success: true, message: "login Success" });
  } catch (error) {
    next(error);
  }
};
