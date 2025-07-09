const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  month: String,
  year: String,
  presentDays: Number,
  baseSalary: Number,
  advances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  finalSalary: Number,
  isPaid: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Salary', salarySchema);
