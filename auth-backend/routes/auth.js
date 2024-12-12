const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// Routes
router.post("/signup", registerUser);
router.post("/login", loginUser);

module.exports = router;