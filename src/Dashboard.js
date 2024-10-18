// Dashboard.js
import React from 'react';

function Dashboard({ totalItems, lowStockItems, restockItems }) {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-item">
        <p>Total Items:</p>
        <h3>{totalItems}</h3>
      </div>
      <div className="dashboard-item">
        <p>Low Stock Items:</p>
        <h3>{lowStockItems}</h3>
      </div>
      <div className="dashboard-item">
        <p>Items to Restock:</p>
        <h3>{restockItems}</h3>
      </div>
    </div>
  );
}

export default Dashboard;
