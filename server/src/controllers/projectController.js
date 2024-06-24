const Employee = require("../models/employee");
const Project = require("../models/project");
const Project_Type = require("../models/project_type");

exports.getAllProjects = async (req, res) => {
  try {
    const project = await Project.findAll({
      include: [
        {
          model: Employee,
          as: "ProjectManager",
          attributes: ["ID", "Full_Name"],
        },
        { model: Project_Type, as: "ProjectType" },
      ],
    });
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: "Projects not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
