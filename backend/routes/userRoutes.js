const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/protect");
const {
  registerUser,
  authUser,
  allUser,
} = require("../controller/registerUser");

router.use(express.json());
router.route("/").post(registerUser).get(protect, allUser);
router.route("/login").post(authUser);

module.exports = router;
