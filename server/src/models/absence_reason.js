const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Absence_Reason = sequelize.define(
  "Absence_Reason",
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
    tableName: "absence_reason",
  }
);

module.exports = Absence_Reason;
