const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const usersMiddleware = require("../middlewares/users");

router.post(
  "/users",
  usersMiddleware.validateCreateUser,
  usersController.createUser
);

module.exports = router;
