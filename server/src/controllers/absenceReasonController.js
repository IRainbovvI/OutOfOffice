const Absence_Reason = require("../models/absence_reason");

exports.getAbsenceReasons = async (req, res) => {
  try {
    const reasons = await Absence_Reason.findAll();
    if (reasons) {
      res.status(200).json(reasons);
    } else {
      res.status(404).json({ error: "Absence reasons not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
