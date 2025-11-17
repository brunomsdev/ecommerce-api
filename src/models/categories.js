const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Categories = sequelize.define("Categories", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Categories;
