const express = require("express");
const router = express.Router();
const {
  markAttendance,
  getAttendanceByEmployee
} = require("../controllers/attendanceController");

// For Admin - Manual entry
router.post("/manual", markAttendance);

// For Mobile - App based entry
router.post("/mobile", markAttendance);

// For viewing attendance records
router.get("/:employeeId", getAttendanceByEmployee);

module.exports = router;
