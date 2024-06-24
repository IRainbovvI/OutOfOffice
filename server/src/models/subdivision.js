const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Subdivision = sequelize.define(
  "Subdivision",
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "subdivision",
  }
);

module.exports = Subdivision;
