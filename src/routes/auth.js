const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");

router.post("/login", authMiddleware.validateLogin, authController.login);

module.exports = router;
