// controllers/auth.js

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/expressError");

// Register a new user
async function register(req, res, next) {
  try {
    // Register the user using data from the request body
    const registeredUser = await User.register(req.body);
    console.log("registeredUser", registeredUser);

    // Generate and return the JWT token
    const token = jwt.sign(
      { username: registeredUser },
      process.env.ACCESS_TOKEN_SECRET
    );

    // Update the login timestamp for the user
    User.updateLoginTimestamp(username);

    res.json({ token });
  } catch (err) {
    return next(err);
  }
}

// Log in a user
async function login(req, res, next) {
  try {
    let { username, password } = req.body;
    // Authenticate the user
    const authenticatedUser = await User.authenticate(username, password);

    if (authenticatedUser) {
      // Generate and return the JWT token
      let token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET);
      // Update the login timestamp for the user
      User.updateLoginTimestamp(username);
      return res.json({ token });
    } else {
      // Invalid username/password error
      throw new ExpressError("Invalid username/password", 400);
    }
  } catch (err) {
    return next(err);
  }
}

module.exports = { register, login };
