const Performance = require("../models/Performance");
const Employee = require("../models/Employee");

// Add new performance review
exports.reviewPerformance = async (req, res) => {
  try {
    const {
      employeeId,
      month,
      rating,
      remark,
      recommendedForPromotion,
      incrementAmount,
      reviewedBy
    } = req.body;

    const performance = new Performance({
      employeeId,
      month,
      rating,
      remark,
      recommendedForPromotion,
      incrementAmount,
      reviewedBy
    });

    await performance.save();

    // If increment, update employee salary
    if (incrementAmount && incrementAmount > 0) {
      await Employee.findByIdAndUpdate(employeeId, {
        $inc: { salary: incrementAmount }
      });
    }

    res.status(201).json({ message: "Performance reviewed", performance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all performance data of an employee
exports.getPerformanceByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const records = await Performance.find({ employeeId }).sort({ month: -1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
