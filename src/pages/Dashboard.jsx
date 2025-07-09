// src/pages/Dashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const features = [
    { title: "Attendance", route: "/attendance" },
    { title: "Salary", route: "/salary" },
    { title: "Commission", route: "/commission" },
    { title: "Leave Management", route: "/leave" },
    { title: "Shift & Task", route: "/task-scheduler" },
    { title: "Performance & Promotion", route: "/performance" },
    { title: "Employee Profile", route: "/employee-profile" },
  ];

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <div className="row g-4">
          {features.map((item, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-lg-4">
              <Link to={item.route} className="text-decoration-none">
                <div className="card shadow-sm h-100">
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">
                      Manage {item.title.toLowerCase()} here
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
