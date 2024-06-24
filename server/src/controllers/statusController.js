const Status = require("../models/status");

exports.getAllStatus = async (req, res) => {
  try {
    const status = await Status.findAll();
    if (status) {
      res.status(200).json(status);
    } else {
      res.status(404).json({ error: "Status not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
