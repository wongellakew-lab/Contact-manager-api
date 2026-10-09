const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/userController");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/current").get(validateToken, getCurrentUser);

module.exports = router;
