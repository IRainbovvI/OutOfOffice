const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Position = require("./position");
const Subdivision = require("./subdivision");

const Employee = sequelize.define(
  "Employee",
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Full_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Subdivision: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subdivision,
        key: "ID",
      },
    },
    Position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Position,
        key: "ID",
      },
    },
    Status: {
      type: DataTypes.ENUM,
      values: ["Active", "Inactive"],
      allowNull: false,
    },
    People_Partner: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "employee",
        key: "ID",
      },
    },
    "Out-of-Office_Balance": {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    Photo: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "employee",
  }
);

Employee.belongsTo(Subdivision, {
  as: "Team",
  foreignKey: "Subdivision",
});
Employee.belongsTo(Position, { as: "Role", foreignKey: "Position" });
Employee.belongsTo(Employee, {
  as: "Partner",
  foreignKey: "People_Partner",
});
Employee.hasMany(Employee, {
  as: "Subordinates",
  foreignKey: "People_Partner",
});

module.exports = Employee;
