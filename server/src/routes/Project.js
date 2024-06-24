const express = require("express");
const ProjectController = require("../controllers/projectController");

const router = express.Router();

router.get("/", ProjectController.getAllProjects);

module.exports = router;
