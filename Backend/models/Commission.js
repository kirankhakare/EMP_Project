const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['fixed', 'percentage'], default: 'fixed' },
  month: String,
  year: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Commission', commissionSchema);
