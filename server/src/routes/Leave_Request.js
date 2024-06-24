const express = require("express");
const Leave_RequestController = require("../controllers/leaveRequestController");

const router = express.Router();

router.get("/", Leave_RequestController.getAllRequests);
router.get("/by_employee", Leave_RequestController.getEmployeeRequests);
router.put("/", Leave_RequestController.updateRequest);
router.put("/status", Leave_RequestController.changeStatus);
router.post("/", Leave_RequestController.createRequest);

module.exports = router;
