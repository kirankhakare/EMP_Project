import React, { useState } from 'react';
import API from '../utils/api';
import Navbar from './Navbar';

const AddCommission = () => {
  const [data, setData] = useState({
    employeeId: '',
    amount: '',
    type: 'fixed',
    month: '',
    year: '',
    description: ''
  });

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/commission/add', data);
      alert('✅ Commission added successfully');
    } catch (err) {
      alert('❌ Failed to add commission');
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="card p-4 shadow">
          <h4>Add Commission</h4>
          <form onSubmit={handleSubmit}>
            <input className="form-control mb-2" name="employeeId" placeholder="Employee ID" onChange={handleChange} required />
            <input className="form-control mb-2" type="number" name="amount" placeholder="Amount" onChange={handleChange} required />
            <select className="form-select mb-2" name="type" onChange={handleChange}>
              <option value="fixed">Fixed</option>
              <option value="percentage">Percentage</option>
            </select>
            <input className="form-control mb-2" name="month" placeholder="Month (e.g. 07)" onChange={handleChange} required />
            <input className="form-control mb-2" name="year" placeholder="Year (e.g. 2025)" onChange={handleChange} required />
            <textarea className="form-control mb-2" name="description" placeholder="Description" onChange={handleChange} />
            <button className="btn btn-success">Add Commission</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCommission;
