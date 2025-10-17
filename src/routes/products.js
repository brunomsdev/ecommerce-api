const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const productsMiddlewares = require("../middlewares/products");

router.post(
  "/products",
  productsMiddlewares.validateInsertProduct,
  productsController.insertProduct
);

router.get("/products", productsController.getAllProducts);

module.exports = router;
