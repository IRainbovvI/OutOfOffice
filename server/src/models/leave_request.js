const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Employee = require("./employee");
const Absence_Reason = require("./absence_reason");
const Status = require("./status");

const Leave_Request = sequelize.define(
  "Leave_Request",
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Employee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employee,
        key: "ID",
      },
    },
    Absence_Reason: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Absence_Reason,
        key: "ID",
      },
    },
    Start_Date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    End_Date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: Status,
        key: "ID",
      },
    },
  },
  {
    timestamps: false,
    tableName: "leave_request",
  }
);

Leave_Request.belongsTo(Employee, {
  as: "Leave_Request_Employee",
  foreignKey: "Employee",
});
Leave_Request.belongsTo(Absence_Reason, {
  as: "Leave_Request_Absence_Reason",
  foreignKey: "Absence_Reason",
});
Leave_Request.belongsTo(Status, {
  as: "Leave_Request_Status",
  foreignKey: "Status",
});

module.exports = Leave_Request;
