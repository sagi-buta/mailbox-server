const mongoose = require("mongoose");

const URL_mongo_DB = process.env.MONGO_URL;

async function connect() {
  try {
    await mongoose.connect(URL_mongo_DB);
    console.log("Connected to MailBox mongo DB");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { connect };
