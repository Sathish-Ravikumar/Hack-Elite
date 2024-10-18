// HomePage.js
import React from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import InventoryForm from './InventoryForm';
import Notifications from './Notifications';
import Reports from './Reports';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <Navbar />
      <section id="dashboard">
        <Dashboard totalItems={100} lowStockItems={5} restockItems={2} />
      </section>
      <section id="inventory">
        <InventoryForm addItem={(item) => console.log(item)} />
      </section>
      <section id="notifications">
        <Notifications lowStockItems={[{ name: 'Item 1' }, { name: 'Item 2' }]} />
      </section>
      <section id="reports">
        <Reports generateReport={() => console.log('Generating report...')} />
      </section>
    </div>
  );
}

export default HomePage;
