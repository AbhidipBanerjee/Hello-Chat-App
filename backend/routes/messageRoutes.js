const express = require("express");
const { protect } = require("../middleware/protect");
const router = express.Router();
const { sendMessage } = require("../controller/messageController");

router.route("/").post(protect, sendMessage);
//router.route('/:chatId').get(protect,allMessage);

module.exports = router;
