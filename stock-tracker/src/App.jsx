import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Chart from "./chart.jsx";

function App() {
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Header */}
      <div className="mobile-header d-lg-none">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <i className="bi bi-list"></i>
        </button>
        <h3 className="text-primary">INFLUENCY</h3>
      </div>

      {/* Sidebar */}
      <div className={`sidebar p-3 bg-white shadow ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-primary mb-0">INFLUENCY</h3>
          <button className="sidebar-close d-lg-none" onClick={toggleSidebar}>
            <i className="bi bi-x"></i>
          </button>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="#" className="nav-link text-dark active">
              <i className="bi bi-house-door me-2"></i>Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-dark">
              <i className="bi bi-file-post me-2"></i>Post
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-dark">
              <i className="bi bi-people me-2"></i>Donators
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-dark">
              <i className="bi bi-file-earmark me-2"></i>Page
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-dark">
              <i className="bi bi-chat-left-text me-2"></i>Messages
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-dark">
              <i className="bi bi-graph-up me-2"></i>Statistics
            </a>
          </li>
        </ul>
        <div className="upgrade-section p-3 bg-light rounded mt-auto">
          <p className="mb-2 fw-bold">Upgrade to Pro</p>
          <p className="small text-muted mb-3">Get access to all premium features</p>
          <button className="btn btn-warning fw-bold w-100">Upgrade for $10</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-header d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <h2 className="mb-3 mb-md-0">Donators</h2>
          <div className="search-container position-relative">
            <i className="bi bi-search search-icon"></i>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search donators..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stats-card primary">
              <div className="stats-content">
                <h3>$740.89</h3>
                <p>In this month</p>
              </div>
              <i className="bi bi-currency-dollar stats-icon"></i>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stats-card secondary">
              <div className="stats-content">
                <h3>80%</h3>
                <p>Active Donation</p>
              </div>
              <i className="bi bi-activity stats-icon"></i>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stats-card dark">
              <div className="stats-content">
                <h3>38</h3>
                <p>New Donators</p>
              </div>
              <i className="bi bi-person-plus stats-icon"></i>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stats-card success">
              <div className="stats-content">
                <h3>$8,234.19</h3>
                <p>For all time</p>
              </div>
              <i className="bi bi-graph-up-arrow stats-icon"></i>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="chart-container">
              <div className="chart-header d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Donation Overview</h4>
                <select className="form-select form-select-sm time-select">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
              </div>
              <Chart searchQuery={search} />
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="chart-container">
              <div className="chart-header d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Top Donators</h4>
                <button className="btn btn-sm btn-outline-secondary">View All</button>
              </div>
              <Chart searchQuery={search} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;