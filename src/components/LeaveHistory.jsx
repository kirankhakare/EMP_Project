import React, { useState } from 'react';
import API from '../utils/api';

const LeaveHistory = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await API.get(`/leave/${employeeId}`);
      setLeaves(res.data);
    } catch (err) {
      alert('❌ Error fetching leave history');
    }
  };

  return (
    <div className="card p-4 mt-4">
      <h4>Leave History</h4>
      <input className="form-control mb-2" placeholder="Employee ID" onChange={e => setEmployeeId(e.target.value)} />
      <button className="btn btn-info mb-3" onClick={fetchLeaves}>Get History</button>
      {leaves.length > 0 && (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, idx) => (
              <tr key={leave._id}>
                <td>{idx + 1}</td>
                <td>{leave.fromDate.split('T')[0]}</td>
                <td>{leave.toDate.split('T')[0]}</td>
                <td>{leave.reason}</td>
                <td><span className={`badge bg-${leave.status === 'Approved' ? 'success' : leave.status === 'Rejected' ? 'danger' : 'warning'}`}>{leave.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveHistory;
