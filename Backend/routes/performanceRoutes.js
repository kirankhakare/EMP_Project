const express = require("express");
const router = express.Router();
const {
  reviewPerformance,
  getPerformanceByEmployee
} = require("../controllers/performanceController");

router.post("/review", reviewPerformance); // Admin reviews
router.get("/:employeeId", getPerformanceByEmployee); // View by employee

module.exports = router;
