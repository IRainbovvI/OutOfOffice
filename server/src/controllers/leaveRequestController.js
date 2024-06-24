const Absence_Reason = require("../models/absence_reason");
const Employee = require("../models/employee");
const Leave_Request = require("../models/leave_request");
const Status = require("../models/status");

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Leave_Request.findAll({
      include: [
        {
          model: Employee,
          as: "Leave_Request_Employee",
        },
        {
          model: Absence_Reason,
          as: "Leave_Request_Absence_Reason",
        },
        { model: Status, as: "Leave_Request_Status" },
      ],
    });
    if (requests) {
      res.status(200).json(requests);
    } else {
      res.status(404).json({ error: "Requests not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeRequests = async (req, res) => {
  const employee = req.query.Employee;
  try {
    const requests = await Leave_Request.findAll({
      where: {
        Employee: employee,
      },
      include: [
        {
          model: Employee,
          as: "Leave_Request_Employee",
        },
        {
          model: Absence_Reason,
          as: "Leave_Request_Absence_Reason",
        },
        { model: Status, as: "Leave_Request_Status" },
      ],
    });
    if (requests) {
      res.status(200).json(requests);
    } else {
      res.status(404).json({ error: "Requests not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRequest = async (req, res) => {
  try {
    const { id, absenceReason, startDate, endDate, comment } = req.body;

    if (!id || !absenceReason || !startDate || !endDate) {
      return res.status(422).json({ error: "Required field(s) are missing" });
    }

    const request = await Leave_Request.findByPk(id);
    if (request) {
      request.set("Absence_Reason", absenceReason);
      request.set("Start_Date", startDate);
      request.set("End_Date", endDate);
      if (comment || comment === "") {
        request.set("Comment", comment);
      }
      await request.save();

      return res.status(200).json(request);
    } else {
      return res.status(404).json({ error: "Request not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const statusDB = await Status.findOne({ where: { Title: status } });
    if (statusDB) {
      const request = await Leave_Request.findByPk(id);
      if (request) {
        request.set("Status", statusDB.ID);
        await request.save();
        return res.status(200).json(request);
      } else {
        return res.status(404).json({ error: "Request not found" });
      }
    } else {
      return res.status(404).json({ error: "Status not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.createRequest = async (req, res) => {
  try {
    const { employeeId, absenceReason, startDate, endDate, comment } = req.body;

    if (!employeeId || !absenceReason || !startDate || !endDate) {
      return res.status(422).json({ error: "Required field(s) are missing" });
    }

    const newRequest = await Leave_Request.create({
      Employee: employeeId,
      Absence_Reason: absenceReason,
      Start_Date: startDate,
      End_Date: endDate,
      Comment: comment,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
