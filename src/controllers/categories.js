const { Categories } = require("../models");

async function insertCategory(req, res) {
  try {
    await Categories.create(req.body);

    return res.status(201).send({
      message: "Categoria criada com sucesso!",
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
}

module.exports = {
  insertCategory,
};
