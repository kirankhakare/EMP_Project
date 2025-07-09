const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  taskName: {
    type: String,
    required: true
  },
  description: String,
  shift: {
    type: String,
    enum: ["Morning", "Evening", "Custom"],
    default: "Custom"
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending"
  },
  assignedOn: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
