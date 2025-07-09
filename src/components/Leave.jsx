import React, { useState } from 'react';
import API from '../utils/api';

const LeaveForm = () => {
  const [form, setForm] = useState({
    employeeId: '',
    fromDate: '',
    toDate: '',
    reason: ''
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { employeeId, fromDate, toDate, reason } = form;
      await API.post('/leave/apply', {
        employeeId,
        fromDate,
        toDate,
        reason
      });
      alert('✅ Leave Applied');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to apply leave');
    }
  };

  return (
    <div className="card p-4">
      <h4>Apply for Leave</h4>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="employeeId"
          placeholder="Employee ID"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          className="form-control mb-2"
          name="fromDate"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          className="form-control mb-2"
          name="toDate"
          onChange={handleChange}
          required
        />
        <textarea
          className="form-control mb-2"
          name="reason"
          placeholder="Reason"
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary">Submit Leave</button>
      </form>
    </div>
  );
};

export default LeaveForm;
