const Salary = require('../models/Salary');
const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// Calculate salary based on present days
exports.calculateSalary = async (req, res) => {
  try {
    const { employeeId, month, year, workingDays, advances = 0, deductions = 0 } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    // Count present days for the given month
    const start = new Date(`${year}-${month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const attendanceRecords = await Attendance.find({
      employeeId,
      date: { $gte: start, $lt: end },
      status: 'Present'
    });

    const presentDays = attendanceRecords.length;
    const baseSalary = employee.salary;
    const perDaySalary = baseSalary / workingDays;
    const calculatedSalary = perDaySalary * presentDays;

    const finalSalary = calculatedSalary - advances - deductions;

    const salary = new Salary({
      employeeId,
      month,
      year,
      presentDays,
      baseSalary,
      advances,
      deductions,
      finalSalary
    });

    await salary.save();
    res.status(200).json({ message: "Salary calculated", salary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get salary details for employee
exports.getSalaryByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const salaries = await Salary.find({ employeeId }).sort({ createdAt: -1 });
    res.status(200).json(salaries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark salary as paid
exports.markSalaryAsPaid = async (req, res) => {
  try {
    const { salaryId } = req.params;
    const updated = await Salary.findByIdAndUpdate(
      salaryId,
      { paid: true },
      { new: true }
    );
    res.status(200).json({ message: "Marked as paid", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const generateSalarySlip = require('../utils/generateSalarySlip');

exports.downloadSalarySlip = async (req, res) => {
  try {
    const { salaryId } = req.params;
    const salary = await Salary.findById(salaryId);
    if (!salary) return res.status(404).json({ error: 'Salary not found' });

    const employee = await Employee.findById(salary.employeeId);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    const slipPath = await generateSalarySlip(salary, employee);
    res.download(slipPath, `salary-slip-${salary.month}-${salary.year}.pdf`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
