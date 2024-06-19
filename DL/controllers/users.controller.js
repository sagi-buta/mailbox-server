const usersModel = require("../models/users.model");

const read = async (filterBy) => {
  let data = await usersModel.find(filterBy);
  return data;
};
const readOne = async (filterBy, proj) => {
  let data = await usersModel
    .findOne(filterBy, proj)
    .populate("chats.chat")
    .populate({ path: "chats.chat.msg", select: "from date content" })
    // populate({ path: "chats.chat.members", select: "fullName avatar" })
    .lean()
    .exec();

  // .populate("chats.chat.msg")
  return data;
};
const create = async (newData) => {
  let data = await usersModel.create(newData);
  return data;
};
const deleteOne = async (id) => {
  let data = await usersModel.findByIdAndRemove(id);
  return data;
};
const update = async (id, newData) => {
  let data = await usersModel.findByIdAndUpdate(id, newData, { new: true });
  return data;
};
// handle messages =================================================================
const addOne = async (id, Key, newData) => {
  //add  a one user data to array key
  let data = await usersModel.findByIdAndUpdate(
    { _id: id },
    { $push: { [Key]: newData } },
    { new: true }
  );
  return data;
};

const addMany = async (idsArr, Key, newData, idFrom) => {
  //add many users data to array key &? update the sender
  let data = await usersModel.updateMany(
    { _id: idsArr },
    { $push: { [Key]: newData } },
    { new: true }
  );
  if (idFrom) {
    const upNewData = { ...newData, isSent: true, isRecieved: false };
    // console.log(upNewData, 22);
    addOne(idFrom, Key, upNewData); //update the sender
  }
  return data;
};

const readByFlags = async (userId, flag, validate) => {
  //get chats by flags

  let resolt = await usersModel.findById(userId).populate("chats");
};

module.exports = {
  read,
  readOne,
  create,
  deleteOne,
  update,
  addMany,
  addOne,
  readByFlags,
};
