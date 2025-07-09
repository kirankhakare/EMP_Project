const Leave = require('../models/leave');

exports.applyLeave = async (req, res) => {
  try {
    const { employeeId, fromDate, toDate, reason } = req.body;
    const leave = new Leave({ employeeId, fromDate, toDate, reason });
    await leave.save();
    res.status(201).json({ message: 'Leave applied successfully', leave });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
