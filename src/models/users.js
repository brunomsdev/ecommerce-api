const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("user", "admin", "seller"),
    allowNull: false,
    defaultValue: "user",
  },
  Image_url: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
});

module.exports = Users;
