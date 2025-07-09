// controllers/employeeController.js

const Employee = require("../models/Employee");

// Create employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, contact, email, position, salary } = req.body;
    const newEmployee = new Employee({
      name,
      contact,
      email,
      position,
      salary
    });
    await newEmployee.save();
    res.status(201).json({ message: "Employee created", employee: newEmployee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
