import './App.css';
import './Navbar.css';
import './HomePage.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

import Dashboard from './Dashboard';
import InventoryForm from './InventoryForm';
import SearchAndFilter from './SearchAndFilter';
import Notifications from './Notifications';
import Reports from './Reports';
import Login from './Login'; 
import Signup from './Signup';
// import InventoryManager from './InventoryManager';

function App() {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication

  useEffect(() => {
    // Fetch inventory from the backend when the component mounts
    axios.get('/api/inventory')
      .then((response) => setInventory(response.data))
      .catch((error) => console.error('Error fetching inventory', error));
  }, []);

  const addItem = (item) => {
    setInventory([...inventory, { ...item, id: inventory.length + 1 }]);
  };

  const updateItem = (id, updatedItem) => {
    setInventory(
      inventory.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
    setIsEditing(false);
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const editItem = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
  };

  const saveEdit = (updatedItem) => {
    updateItem(currentItem.id, updatedItem);
    setCurrentItem(null);
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = (
      filterCriteria === 'lowStock' ? item.quantity < 5 :
      filterCriteria === 'outOfStock' ? item.quantity === 0 :
      true
    );
    return matchesSearch && matchesFilter;
  });

  const lowStockItems = inventory.filter((item) => item.quantity < 5);

  const generateReport = () => {
    const report = inventory.map((item) => `${item.name}: ${item.quantity} (Price: ${item.price})`).join('\n');
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'inventory-report.txt';
    link.click();
  };

  const handleLogin = () => {
    setIsAuthenticated(true); // Set authentication state to true on login
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* Pass handleLogin to Login */}
          <Route path="/signup" element={<Signup />} /> {/* Route for Signup */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? ( // Check if the user is authenticated
                <>
                  <h1>Inventory Management System</h1>
                  <Dashboard
                    totalItems={inventory.length}
                    lowStockItems={lowStockItems.length}
                    restockItems={lowStockItems.length}
                  />
                  <InventoryForm
                    addItem={addItem}
                    isEditing={isEditing}
                    currentItem={currentItem}
                    saveEdit={saveEdit}
                  />
                  {/* <InventoryManager/> */}
                  <SearchAndFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filterCriteria={filterCriteria}
                    setFilterCriteria={setFilterCriteria}
                  />
                  <ul>
                    {filteredInventory.map((item) => (
                      <li key={item.id}>
                        Item name: {item.name} <br/> Quantity: {item.quantity}{' '} <br/> Price: {item.price}
                        <button onClick={() => editItem(item)}>Edit</button>{' '}
                        <button onClick={() => deleteItem(item.id)}>Delete</button>
                      </li>
                    ))}
                  </ul>
                  <br/>
                  <Notifications lowStockItems={lowStockItems} />
                  <Reports generateReport={generateReport} />
                </>
              ) : (
                <Navigate to="/login" /> // Redirect to login if not authenticated
              )
            }
          />
          {/* Add more routes as needed */}
          <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login for any other route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
