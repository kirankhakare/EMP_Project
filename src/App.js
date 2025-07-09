import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Attendance from './components/Attendance';
import Salary from './components/Salary';
import Commission from './components/Commission';
import Leave from './components/Leave';
import TaskScheduler from './components/TaskScheduler';
import Performance from './components/Performance';
import EmployeeProfile from './pages/EmployeeProfile';
import CreateEmployee from './components/CreateEmployee'; // optional

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/salary" element={<Salary />} />
        <Route path="/commission" element={<Commission />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/task-scheduler" element={<TaskScheduler />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/employee-profile" element={<EmployeeProfile />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
