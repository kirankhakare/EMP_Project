const express = require("express");
const router = express.Router();
const {
  calculateSalary,
  getSalaryByEmployee,
  markSalaryAsPaid,
  downloadSalarySlip  // <-- Make sure this is included
} = require("../controllers/salaryController");

router.post("/calculate", calculateSalary);
router.get("/:employeeId", getSalaryByEmployee);
router.put("/mark-paid/:salaryId", markSalaryAsPaid);
router.get("/slip/:salaryId", downloadSalarySlip); // ✅ Fixed

module.exports = router;
