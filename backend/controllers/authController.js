const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
// api endpoints

const test = (req, res) => {
  res.json("test endpoints are working");
};

// register endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if name was entered
    if (!name) {
      return res.json({
        error: "Name is required.",
      });
    }
    // check if password is strong
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and must be at least 6 characters long.",
      });
    }

    // check if email already registered
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email has been taken.",
      });
    }

    const hashedPassword = await hashPassword(password);
    // create the user in the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

// login endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    // check if passwords match
    const match = await comparePassword(password, user.password);
    if (match) {
      // assign json web token
      res.json("Passwords match!");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
};
