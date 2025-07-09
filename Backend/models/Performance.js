const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  month: {
    type: String,
    required: true // e.g., "July 2025"
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  remark: {
    type: String,
    trim: true
  },
  recommendedForPromotion: {
    type: Boolean,
    default: false
  },
  incrementAmount: {
    type: Number,
    default: 0
  },
  reviewedBy: {
    type: String,
    default: "System Admin"
  }
}, { timestamps: true });

module.exports = mongoose.model("Performance", performanceSchema);
