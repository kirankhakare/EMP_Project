const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  contact: { type: String, required: true, unique: true, trim: true },
  email: { type: String, trim: true },
  position: { type: String, trim: true },
  joiningDate: { type: Date, default: Date.now },
  salary: { type: Number, default: 0 },
  commissionEarned: { type: Number, default: 0 },
  tasks: [
    {
      taskName: String,
      deadline: Date,
      status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending"
      }
    }
  ],
  attendance: [
    {
      date: Date,
      status: {
        type: String,
        enum: ["Present", "Absent", "Leave"],
        default: "Present"
      }
    }
  ],
  performanceRatings: [
    {
      month: String,
      rating: Number,
      remark: String
    }
  ],
  invoicesAdded: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer"
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
