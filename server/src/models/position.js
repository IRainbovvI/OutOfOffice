const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Position = sequelize.define(
  "Position",
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
    tableName: "position",
  }
);

module.exports = Position;
