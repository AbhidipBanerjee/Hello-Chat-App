const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB Connected:".red.bold);
  } catch (error) {
    console.log(error);
  }
};

module.exports = ConnectDB;
