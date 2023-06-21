const express = require("express");
const chats = require("./data/data.js");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const ConnectDB = require("./config/ConnectDB");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");

ConnectDB();

const app = express();

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(function (req, res) {
  res.status(400).send("NOT FOUND!!!");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT ${PORT}`.yellow.bold);
});
