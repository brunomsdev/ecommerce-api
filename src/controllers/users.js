const { Users } = require("../models");

async function createUser(req, res) {
  try {
    await Users.create(req.body);

    return res.status(201).send({
      message: "Usuário criado com sucesso!",
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
}

module.exports = {
  createUser,
};
