// controllers/user.js

const User = require("../models/user");
const ExpressError = require("../utils/expressError");

// Get details of all users
async function getAllUsers(req, res, next) {
  try {
    let allUsers = await User.all();
    if (!allUsers) {
      throw new ExpressError("No users in the database", 404);
    }
    return res.json({ allUsers });
  } catch (err) {
    return next(err);
  }
}

// Get details of a specific user
async function getUserDetail(req, res, next) {
  try {
    const user = await User.get(req.params.username);
    if (!user) {
      throw new ExpressError("User not found!", 404);
    }
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
}

// Get inbox messages for a specific user
async function getInboxMessages(req, res, next) {
  try {
    const inboxMessages = await User.messagesFrom(req.params.username);
    if (inboxMessages.length === 0) {
      throw new ExpressError("No inbox messages!", 404);
    }
    return res.json({ inboxMessages });
  } catch (err) {
    return next(err);
  }
}

// Get outbox messages for a specific user
async function getOutboxMessages(req, res, next) {
  try {
    const outboxMessages = await User.messagesTo(req.params.username);
    if (outboxMessages.length === 0) {
      throw new ExpressError("No outbox messages!", 404);
    }
    return res.json({ outboxMessages });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getAllUsers,
  getUserDetail,
  getInboxMessages,
  getOutboxMessages,
};
