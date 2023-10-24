const express = require("express");
const app = express();
const ExpressError = require("./utils/expressError");
const { authenticateToken } = require("./middleware/auth");

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("../src/routes/users");
const messageRoutes = require("../src/routes/messages");
const secretRoutes = require("./routes/secret");

app.use("/auth", authRoutes);
app.use(authenticateToken);
app.use(secretRoutes);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

// app.set("view engine", "ejs");
// app.set("views", "views");

/** ERROR Handlers at the end of App (app.use (gobal middlewares)
 * middlware order matters!) */
/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** General Error Handler */

app.use(function (err, req, res, next) {
  let status = err.status || 500;

  res.status(status).json({ error: err, message: err.msg });
});

module.exports = app;
