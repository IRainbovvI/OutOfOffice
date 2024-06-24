const express = require("express");
const EmployeeController = require("../controllers/employeeController");

const router = express.Router();

router.get("/by_full_name", EmployeeController.getEmployeeByFullName);

module.exports = router;
