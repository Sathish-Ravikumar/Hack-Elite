// Notifications.js
import React from 'react';

function Notifications({ lowStockItems }) {
  return (
    <div className="notifications">
      <h2>Notifications</h2>
      {lowStockItems.length > 0 ? (
        <ul>
          {lowStockItems.map((item, index) => (
            <li key={index}>
              <p>{item.name} is running low on stock.</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No low stock items.</p>
      )}
    </div>
  );
}

export default Notifications;
