const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post("/login", login);

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post("/register", register);

module.exports = router;
