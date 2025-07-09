const Task = require("../models/Task");

// Assign new task
exports.assignTask = async (req, res) => {
  try {
    const { employeeId, taskName, description, shift, deadline } = req.body;

    const task = new Task({
      employeeId,
      taskName,
      description,
      shift,
      deadline
    });

    await task.save();
    res.status(201).json({ message: "Task assigned", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const updated = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task status updated", task: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tasks for an employee
exports.getEmployeeTasks = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const tasks = await Task.find({ employeeId }).sort({ deadline: 1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
