  // Reports.js
  import React from 'react';

  function Reports({ generateReport }) {
    const handleGenerateReport = () => {
      generateReport();
    };

    return (
      <div className="reports">
        <h2>Reports</h2>
        <button onClick={handleGenerateReport}>Generate Report</button>
      </div>
    );
  }

  export default Reports;
