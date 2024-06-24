const express = require("express");
const router = express.Router();

router.use("/employee", require("./Employee"));
router.use("/leave_request", require("./Leave_Request"));
router.use("/absence_reason", require("./Absence_Reason"));
router.use("/status", require("./Status"));
router.use("/project", require("./Project"));

module.exports = router;
