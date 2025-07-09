const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Leave"],
    required: true,
  },
  geoLocation: {
    type: String,
    default: "",
  },
  source: {
    type: String, // "Mobile" or "Admin"
    default: "Admin",
  },
  date: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Attendance", attendanceSchema);
