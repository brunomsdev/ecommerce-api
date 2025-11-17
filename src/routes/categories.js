const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categories");

router.post("/categories", categoriesController.insertCategory);

module.exports = router;
