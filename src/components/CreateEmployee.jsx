// src/components/CreateEmployee.jsx

import React, { useState } from 'react';
import API from '../utils/api';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    position: '',
    salary: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/create', form);
      alert('Employee created successfully');
      navigate('/'); // Go back to dashboard
    } catch (err) {
      alert('Error creating employee. Make sure contact is unique.');
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card mx-auto shadow" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Create New Employee</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contact</label>
                <input
                  type="text"
                  name="contact"
                  className="form-control"
                  required
                  value={form.contact}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Position</label>
                <input
                  type="text"
                  name="position"
                  className="form-control"
                  value={form.position}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Salary (Monthly)</label>
                <input
                  type="number"
                  name="salary"
                  className="form-control"
                  value={form.salary}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Add Employee
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEmployee;
