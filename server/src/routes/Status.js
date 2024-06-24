const express = require("express");
const StatusController = require("../controllers/statusController");

const router = express.Router();

router.get("/", StatusController.getAllStatus);

module.exports = router;
