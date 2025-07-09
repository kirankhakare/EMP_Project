// src/pages/EmployeeProfile.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';
import Navbar from '../components/Navbar';

const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await API.get(`/${id}`); // GET /api/employees/:id
        setEmployee(res.data);
      } catch (err) {
        console.error('Failed to load employee profile', err);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="card shadow p-4">
          <h3 className="mb-3">Employee Profile</h3>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Contact:</strong> {employee.contact}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Salary:</strong> ₹{employee.salary}</p>
          <p><strong>Joining Date:</strong> {new Date(employee.joiningDate).toDateString()}</p>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;
