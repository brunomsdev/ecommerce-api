const sequelize = require("../config/database");
const Categories = require("./categories");
const Products = require("./products");
const ProductsImages = require("./products_images");
const Users = require("./users");

sequelize
  .sync({ alter: true })
  .then(() => console.log("Tabelas sincronizadas com sucesso!"))
  .catch((error) => console.error("Erro ao sincronizar tabelas", error));

module.exports = {
  Categories,
  Products,
  ProductsImages,
  Users,
};
