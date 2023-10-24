// routes/protected.js
const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("../middleware/auth");

router.get("/secret", ensureLoggedIn, (req, res, next) => {
  res.send(`Welcome, ${req.user.username}!`);
});

module.exports = router;
