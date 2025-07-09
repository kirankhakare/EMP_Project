const express = require("express");
const router = express.Router();
const {
  assignTask,
  updateTaskStatus,
  getEmployeeTasks
} = require("../controllers/taskController");

router.post("/assign", assignTask); // Admin assigns
router.patch("/:taskId", updateTaskStatus); // Update task status
router.get("/:employeeId", getEmployeeTasks); // View employee tasks

module.exports = router;
