const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api/employees', employeeRoutes);

const attendanceRoutes = require("./routes/attendanceRoutes");
app.use("/api/attendance", attendanceRoutes);

const salaryRoutes = require("./routes/salaryRoutes");
app.use("/api/salary", salaryRoutes);

const commissionRoutes = require("./routes/commissionRoutes");
app.use("/api/commission", commissionRoutes);

const leaveRoutes = require("./routes/leaveRoutes");
app.use("/api/leaves", leaveRoutes);

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/task", taskRoutes);

const performanceRoutes = require("./routes/performanceRoutes");
app.use("/api/performance", performanceRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Server started at http://localhost:5000")))
  .catch((err) => console.error("MongoDB connection failed:", err));
