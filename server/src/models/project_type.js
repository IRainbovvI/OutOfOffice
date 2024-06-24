const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Project_Type = sequelize.define(
  "Project_Type",
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
    tableName: "project_type",
  }
);

module.exports = Project_Type;
