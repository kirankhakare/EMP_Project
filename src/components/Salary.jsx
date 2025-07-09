import React, { useState } from 'react';
import API from '../utils/api';
import Navbar from './Navbar';

const Salary = () => {
  const [form, setForm] = useState({
    employeeId: '',
    month: '',
    year: '',
    workingDays: 30,
    advances: 0,
    deductions: 0,
  });

  const [result, setResult] = useState(null);
  const [commissions, setCommissions] = useState([]);
  const [showCommission, setShowCommission] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/salary/calculate', form);
      setResult(res.data.salary);
    } catch (err) {
      alert("❌ Salary calculation failed");
      console.error(err);
    }
  };

  const fetchCommissions = async () => {
    try {
      const res = await API.get('/commission/filter', {
        params: {
          employeeId: form.employeeId,
          month: form.month,
          year: form.year
        }
      });
      setCommissions(res.data);
      setShowCommission(true);
    } catch (err) {
      alert("❌ Failed to fetch commission data");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="card shadow p-4">
          <h3 className="text-center mb-4 text-primary">Salary Calculator</h3>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-4">
              <label>Employee ID</label>
              <input type="text" name="employeeId" className="form-control" required onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label>Month (01 - 12)</label>
              <input type="text" name="month" className="form-control" required onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label>Year</label>
              <input type="text" name="year" className="form-control" required onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label>Working Days</label>
              <input type="number" name="workingDays" className="form-control" value={form.workingDays} onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label>Advance Payment</label>
              <input type="number" name="advances" className="form-control" value={form.advances} onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label>Deductions</label>
              <input type="number" name="deductions" className="form-control" value={form.deductions} onChange={handleChange} />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-success w-100">Calculate Salary</button>
            </div>
          </form>
        </div>

        {result && (
          <div className="card mt-4 shadow p-4">
            <h4 className="text-success mb-3">Calculated Salary Details</h4>
            <ul className="list-group">
              <li className="list-group-item">Present Days: <strong>{result.presentDays}</strong></li>
              <li className="list-group-item">Base Salary: ₹{result.baseSalary.toFixed(2)}</li>
              <li className="list-group-item">Advance: ₹{result.advances}</li>
              <li className="list-group-item">Deductions: ₹{result.deductions}</li>
              <li className="list-group-item bg-light">Final Salary: <strong>₹{result.finalSalary.toFixed(2)}</strong></li>
            </ul>

            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn btn-outline-primary"
                onClick={() =>
                  window.open(`${process.env.REACT_APP_API_BASE_URL}/salary/slip/${result._id}`, '_blank')
                }
              >
                Download Salary Slip
              </button>

              <button className="btn btn-outline-info" onClick={fetchCommissions}>
                Show Commission Report
              </button>
            </div>
          </div>
        )}

        {showCommission && commissions.length > 0 && (
          <div className="card mt-4 shadow p-4">
            <h5 className="text-info mb-3">Commission Report</h5>
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Month</th>
                  <th>Year</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {commissions.map((c, idx) => (
                  <tr key={c._id || idx}>
                    <td>{idx + 1}</td>
                    <td>₹{c.amount}</td>
                    <td>{c.type}</td>
                    <td>{c.month}</td>
                    <td>{c.year}</td>
                    <td>{c.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showCommission && commissions.length === 0 && (
          <div className="alert alert-warning mt-3">No commission records found for selected month.</div>
        )}
      </div>
    </>
  );
};

export default Salary;
