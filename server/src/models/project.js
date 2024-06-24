const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Project_Type = require("./project_type");
const Employee = require("./employee");

const Project = sequelize.define(
  "Project",
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Project_Type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project_Type,
        key: "ID",
      },
    },
    Start_Date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    End_Date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    Project_Manager: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employee,
        key: "ID",
      },
    },
    Comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Active", "Inactive"],
    },
  },
  {
    timestamps: false,
    tableName: "project",
  }
);

Project.belongsTo(Project_Type, {
  foreignKey: "Project_Type",
  as: "ProjectType",
});
Project.belongsTo(Employee, {
  as: "ProjectManager",
  foreignKey: "Project_Manager",
});

module.exports = Project;
