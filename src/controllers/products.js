const {
  uploadAndSaveProductsImages,
} = require("../helpers/product-images-upload");
const { Products } = require("../models");

async function insertProduct(req, res) {
  try {
    const product = await Products.create(req.body);

    let images = [];
    try {
      images = await uploadAndSaveProductsImages(product.id, req.files);
    } catch (error) {
      console.error("Erro no upload das images", Error.message);
    }

    return res.status(201).send({
      message: "Produto criado com sucesso!",
      images: images.map((img) => ({
        url: img.url,
      })),
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await Products.findAll();

    return res.send(products);
  } catch (error) {
    return res.status(500).send({
      error: "Erro ao buscar produtos",
    });
  }
}

module.exports = {
  insertProduct,
  getAllProducts,
};
