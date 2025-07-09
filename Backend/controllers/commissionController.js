const Commission = require('../models/Commission');

exports.addCommission = async (req, res) => {
  try {
    const commission = await Commission.create(req.body);
    res.status(201).json(commission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommissionByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const commissions = await Commission.find({ employeeId });
    res.status(200).json(commissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommissionByMonth = async (req, res) => {
  try {
    const { employeeId, month, year } = req.query;
    const commissions = await Commission.find({ employeeId, month, year });
    res.status(200).json(commissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
