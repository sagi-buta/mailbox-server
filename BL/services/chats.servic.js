const chatsCtrl = require("../../DL/controllers/cahts.controller");
const userCtrl = require("../../DL/controllers/users.controller");
const mongoose = require("mongoose");
const { Flags } = require("../../utility");
// Flags : {
//         Sent: "isSent",
//         Inbox: "isRecieved",
//         Favorite: "isFavorite",
//         Deleted: "isDeleted",
//         Draft: "isDraft",
//         Read: "isRead",
//         NotRead: {"isRead":false},
//     },

let funcs = {
  inbox: [Flags.Inbox],
  notread: [Flags.NotRead],
  send: [Flags.Sent],
  favorite: [Flags.Favorite],
  deleted: [Flags.Deleted],
  draft: [Flags.Draft],
};

async function getChatsServic(userId, flag) {
  let resolt = await userCtrl.readByFlags(userId, flag);
  return resolt;
}

async function newMsgServic(newMsgObj) {
  const updateMsgObj = {
    subject: newMsgObj.subject,
    msg: { from: newMsgObj._id, content: newMsgObj.content },
    members: newMsgObj.members,
    lastDate: new Date(),
  };
  const chatResolt = await chatsCtrl.create(updateMsgObj);
  const chatObjForUser = {
    chat: chatResolt._id,
    isSent: false,
    isRecieved: true,
    isFavorite: false,
    isDeleted: false,
    isDraft: false,
  };

  let membersIdsArr = newMsgObj.members.map((id) => {
    return new mongoose.Types.ObjectId(id);
  });

  console.log(membersIdsArr);
  let fromId = new mongoose.Types.ObjectId(newMsgObj._id);
  const userResolt = await userCtrl.addMany(
    membersIdsArr,
    "chats",
    chatObjForUser,
    newMsgObj._id
    // fromId
  );
  const data = { userResolt, chatResolt };
  console.log(data);
  return data;

  //       chat: {
  //         type: mongoose.SchemaTypes.ObjectId,
  //         ref: "chats",
  //       },
  //       isSent: Boolean,
  //       isRecieved: Boolean,
  //       isFavorite: Boolean,
  //       isDeleted: Boolean,
  //       isDraft: Boolean,
  //       isRead: { type: Boolean, default: false },
  //       labels: [String],
  //     },
}

module.exports = { newMsgServic, getChatsServic };
