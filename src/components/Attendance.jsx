import React, { useState } from 'react';
import API from '../utils/api';
import Navbar from '../components/Navbar';

const Attendance = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [status, setStatus] = useState('Present');
  const [date, setDate] = useState('');
  const [records, setRecords] = useState([]);

  const markAttendance = async (e) => {
    e.preventDefault();
    try {
      await API.post('/attendance/manual', {
  employeeId,
  status,
  date,
  geoLocation: 'Amravati',
  source: 'Admin'
});

      alert("✅ Attendance marked successfully!");
      fetchRecords();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to mark attendance. Please check Employee ID or backend status.");
    }
  };

  const fetchRecords = async () => {
    if (!employeeId) return;
    try {
      const res = await API.get(`/attendance/${employeeId}`);
      setRecords(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Error fetching records.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card shadow p-4">
          <h3 className="mb-4 text-center text-primary">Attendance Management</h3>
          <form onSubmit={markAttendance} className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Employee ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Leave">Leave</option>
              </select>
            </div>

            <div className="col-12 d-flex justify-content-between mt-3">
              <button type="submit" className="btn btn-success">Mark Attendance</button>
              <button type="button" className="btn btn-info" onClick={fetchRecords}>View Records</button>
            </div>
          </form>
        </div>

        {records.length > 0 && (
          <div className="card shadow p-4 mt-4">
            <h4 className="mb-3">Attendance Records</h4>
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec, index) => (
                  <tr key={index}>
                    <td>{rec.date?.substring(0, 10)}</td>
                    <td>{rec.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Attendance;
