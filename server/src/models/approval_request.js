const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Employee = require("./employee");
const Absence_Reason = require("./absence_reason");
const Status = require("./status");
const Leave_Request = require("./leave_request");

const Approval_Request = sequelize.define(
  "Approval_Request",
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Approver: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employee,
        key: "ID",
      },
    },
    Leave_Request: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Leave_Request,
        key: "ID",
      },
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Status,
        key: "ID",
      },
    },
    Comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "approval_request",
  }
);

Approval_Request.belongsTo(Employee, { foreignKey: "Approver" });
Approval_Request.belongsTo(Leave_Request, { foreignKey: "Leave_Request" });
Approval_Request.belongsTo(Status, { foreignKey: "Status" });

module.exports = Approval_Request;
