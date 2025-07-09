const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  try {
    const { employeeId, status, geoLocation, source } = req.body;
    const today = new Date().toISOString().split("T")[0];

    const alreadyExists = await Attendance.findOne({
      employeeId,
      date: {
        $gte: new Date(today),
        $lt: new Date(new Date(today).getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (alreadyExists) {
      return res.status(400).json({ message: "Already marked today" });
    }

    const attendance = new Attendance({ employeeId, status, geoLocation, source });
    await attendance.save();
    res.status(201).json({ message: "Attendance marked", attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAttendanceByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const records = await Attendance.find({ employeeId }).sort({ date: -1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
