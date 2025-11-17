const multer = require("multer");
const { Categories } = require("../models");

const upload = multer({ storage: multer.memoryStorage() });

async function validateInsertProduct(req, res, next) {
  await new Promise((resolve, reject) => {
    upload.array("images", 5)(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  const { name, category_id, price, shipping, warranty, return_policy } =
    req.body;

  if (
    !name ||
    !category_id ||
    !price ||
    !warranty ||
    !shipping ||
    !return_policy
  ) {
    return res.status(400).send({
      error: "Todos os campos são obrigatórios",
    });
  }

  if (name.length > 255) {
    return res.status(400).send({
      error: "Name deve ter no máximo 255 caracteres",
    });
  }

  try {
    const category = await Categories.findByPk(category_id);

    if (!category) {
      return res.status(400).send({
        error: "Categoria não encontrada",
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }

  req.body.return = return_policy;

  next();
}

module.exports = {
  validateInsertProduct,
};
