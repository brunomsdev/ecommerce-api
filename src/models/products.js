const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Products = sequelize.define("Products", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  original_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },

  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Categories",
      key: "id",
    },
  },

  is_new: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  specifications: {
    type: DataTypes.JSON,
    allowNull: true,
  },

  shipping: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  warranty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  return: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Products;
