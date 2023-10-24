// controllers/message.js

const Message = require("../models/message");
const ExpressError = require("../utils/expressError");

// Get details of a message
async function getMessageDetails(req, res, next) {
  const messageId = req.params.id;
  const currentUser = req.user.username;
  console.log("currentUser", currentUser);

  try {
    const message = await Message.get(messageId);
    console.log("messages", message);

    let fromUser = message.from_user.username;
    let toUser = message.to_user.username;

    if (fromUser !== currentUser && toUser !== currentUser) {
      throw new ExpressError(`Message not FROM or TO ${currentUser}`, 404);
    } else {
      return res.json({ message });
    }
  } catch (err) {
    return next(err);
  }
}

// Create a new message
async function newMessage(req, res, next) {
  try {
    const from_username = req.user.username;
    const { to_username, body } = req.body;
    const newMessage = await Message.create(from_username, to_username, body);
    return res.json({ newMessage });
  } catch (err) {
    return next(err);
  }
}

// Mark a message as read
async function markMessageAsRead(req, res, next) {
  try {
    const markedMessage = await Message.markRead(req.params.id);
    return res.send({ message: "Successfully marked Message" });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getMessageDetails, newMessage, markMessageAsRead };
