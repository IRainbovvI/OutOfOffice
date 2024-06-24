const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Status = sequelize.define(
  "Status",
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
    tableName: "status",
  }
);

module.exports = Status;
