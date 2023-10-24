// utils/expressError.js

// Custom ExpressError class for handling HTTP errors
class ExpressError extends Error {
  constructor(msg, status) {
    super();
    this.msg = msg;
    this.status = status;
    console.log(this.stack);
  }
}

module.exports = ExpressError;
