const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const productsMiddlewares = require("../middlewares/products");
const { authToken } = require("../middlewares/authToken");

router.post(
  "/products",
  authToken(["seller", "admin"]),
  productsMiddlewares.validateInsertProduct,
  productsController.insertProduct
);

router.get("/products", productsController.getAllProducts);

module.exports = router;
