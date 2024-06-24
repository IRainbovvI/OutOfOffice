const express = require("express");
const Absence_ReasonController = require("../controllers/absenceReasonController");

const router = express.Router();

router.get("/", Absence_ReasonController.getAbsenceReasons);

module.exports = router;
