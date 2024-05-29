const {
  read,
  readOne,
  create,
  update,
  deleteOne,
} = require("../../DL/controllers/users.controller");

const readFun = async (filterBy, proj) => {
  //get all users --OR-- one by id
  let Data = (await filterBy) ? readOne(filterBy, proj) : read({});
  if (!Data) throw " Data no found";
  return Data;
};
const updateFun = async (id, data) => {
  //uodate user --or-- cancel activity
  let Data = await update(id, data);
  if (!id) throw "no id ";
  else if (!data) throw "no apdatetData";
  else if (!Data) throw "Data no found";
  return Data;
};
const createFun = async (data) => {
  let Data = await create(data);
  if (!data) throw "no data ";
  return Data;
};
const deleteFun = async (id) => {
  //delete user from data
  let Data = await deleteOne(id);
  if (!id) throw "no id ";
  else if (!Data) throw "no data ";
  return Data;
};

// const loginFun = async (filterBy, info) => {
//     let Data = readOne({email:filterBy})
//     if (!Data) throw "no data "
//     return Data
// }

module.exports = { createFun, readFun, deleteFun, updateFun };
