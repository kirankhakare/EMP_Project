const express = require('express');
const router = express.Router();
const {
  addCommission,
  getCommissionByEmployee,
  getCommissionByMonth
} = require('../controllers/commissionController');

router.post('/add', addCommission);
router.get('/employee/:employeeId', getCommissionByEmployee);
router.get('/filter', getCommissionByMonth);

module.exports = router;
