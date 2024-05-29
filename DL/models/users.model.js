const mongoose = require("mongoose");

require("./chtas.model");

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
  },
  avatar: String,

  isActive: {
    type: Boolean,
    default: true,
  },
  token: {
    type: String,
    //required: true,
    default: null,
  },
  chats: [
    {
      chat: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "chats",
      },
      isSent: Boolean,
      isRecieved: Boolean,
      isFavorite: Boolean,
      isDeleted: Boolean,
      isDraft: Boolean,
      isRead: { type: Boolean, default: false },
      labels: [String],
    },
  ],
});

// async function go() {
//   require("dotenv").config();
//   require("../db").connect();
//   let chats2 = await userModel
//     .findOne({ _id: "660d26b92a155d99889d3942" })
//     .populate("chats.chat");
//   let { chats } = await chats2.populate("chats.chat.msg"); //.populate('chats.chat.to');
//   // console.log(chats[0].chat);
//   let res = chats.filter((c) => c.isRecieved);
//   console.log(res);
// }
// go()

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
