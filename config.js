// /** Common config for message.ly */

// read .env files and make environmental variables
require("dotenv").config();

const DB_URI =
  process.env.NODE_ENV === "test"
    ? "postgresql:///messagely2-test"
    : "postgresql:///messagely2";

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || "secret";

const BCRYPT_WORK_FACTOR = 12;

module.exports = {
  DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
};
