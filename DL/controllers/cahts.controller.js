const chatsModel = require("../models/chtas.model");

const create = async (chatObj) => {
  return await chatsModel.create(chatObj);
};

module.exports = { create };
