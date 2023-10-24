const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/expressError");

/** Middleware: Authenticate user. */

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    console.log("authHeader", authHeader);
    return res.sendStatus(401); // Unauthorized
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("token", token);
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    // Store the authenticated user in the request object
    req.user = user;

    next();
  });
}

/** Middleware: Requires user is authenticated. */

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    const err = new ExpressError("Unauthorized", 401);
    return next(err);
  } else {
    return next();
  }
}

/** Middleware: Requires correct username. */

function ensureCorrectUser(req, res, next) {
  try {
    if (req.user.username === req.params.username) {
      return next();
    } else {
      return next({ status: 401, message: "Unauthorized" });
    }
  } catch (err) {
    // errors would happen here if we made a request and req.user is undefined
    return next({ status: 401, message: "Unauthorized" });
  }
}
// end

module.exports = { authenticateToken, ensureLoggedIn, ensureCorrectUser };
