const jwt = require("jsonwebtoken");
const { Users } = require("../models");

function authToken(allowedRoles = []) {
  return async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({
        error: "Token não fornecido",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await Users.findByPk(decoded.id);

      if (!user) {
        return res.status(401).send({
          error: "Usuário não encontrado",
        });
      }

      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return res.status(403).send({
          error: "Acesso não autorizado",
        });
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).send({
        error: "token inválido",
      });
    }
  };
}

module.exports = {
  authToken,
};
