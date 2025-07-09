const Attendance = require("../models/Attendance");

const calculateSalary = async (employee, month, baseSalary) => {
  const [monthName, year] = month.split("-");
  const start = new Date(`${year}-${monthName}-01`);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);

  const attendanceRecords = await Attendance.find({
    employeeId: employee._id,
    date: { $gte: start, $lt: end }
  });

  const totalDays = attendanceRecords.length;
  const present = attendanceRecords.filter(r => r.status === "Present").length;
  const leave = attendanceRecords.filter(r => r.status === "Leave").length;
  const absent = totalDays - (present + leave);

  const dailySalary = baseSalary / 30;
  const netPay = (present + leave) * dailySalary;

  return {
    daysPresent: present,
    daysAbsent: absent,
    leaveDays: leave,
    netPayable: netPay
  };
};

module.exports = calculateSalary;
