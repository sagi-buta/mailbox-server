const mongoose = require("mongoose");
require("./users.model");

//---messageSchema---
const messageSchema = new mongoose.Schema({
  from: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  content: String,
});

//---chatSchema---
const chatSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },

  msg: [messageSchema],

  members: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
  ],

  lastDate: Date,
});

const chatModel = mongoose.model("chats", chatSchema);

module.exports = chatModel;
