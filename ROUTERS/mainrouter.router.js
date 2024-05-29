const users = require("./users.router");
const chats = require("./chats.router");

const maineRouter = (app) => {
  app.use("/users", users);
  app.use("/chats", chats);
};

module.exports = maineRouter;
