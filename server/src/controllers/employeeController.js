const Employee = require("../models/employee");
const Position = require("../models/position");

// // Create a new employee
// exports.createEmployee = async (req, res) => {
//   try {
//     const employee = await Employee.create(req.body);
//     res.status(201).json(employee);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Get all employees
// exports.getAllEmployees = async (req, res) => {
//   try {
//     const employees = await Employee.findAll();
//     res.status(200).json(employees);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get a single employee by ID
// exports.getEmployeeById = async (req, res) => {
//   try {
//     const employee = await Employee.findByPk(req.params.id);
//     if (employee) {
//       res.status(200).json(employee);
//     } else {
//       res.status(404).json({ message: "Employee not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getEmployeeByFullName = async (req, res) => {
  const fullName = req.query.FullName;
  try {
    const employee = await Employee.findOne({
      where: { Full_Name: fullName },
      attributes: ["Full_Name", "ID"],
      include: [{ model: Position, as: "Role", attributes: ["Title"] }],
    });
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Update an employee by ID
// exports.updateEmployee = async (req, res) => {
//   try {
//     const [updated] = await Employee.update(req.body, {
//       where: { ID: req.params.id },
//     });
//     if (updated) {
//       const updatedEmployee = await Employee.findByPk(req.params.id);
//       res.status(200).json(updatedEmployee);
//     } else {
//       res.status(404).json({ message: "Employee not found" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
