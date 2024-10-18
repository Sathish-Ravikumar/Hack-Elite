import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchItems, addItem, updateItem, deleteItem } from './services/inventoryService';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import InventoryManager from './InventoryManager';

Chart.register(ArcElement, Tooltip, Legend);

function InventoryList() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, price: 0 }); // Include price in the newItem state

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const items = await fetchItems();
        setInventory(items);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    loadInventory();
  }, []);

  const handleAddItem = async () => {
    try {
      const addedItem = await addItem(newItem);
      setInventory([...inventory, addedItem]);
      setNewItem({ name: '', quantity: 1, price: 0 }); // Reset form after submission
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateItem = async (index) => {
    const itemToUpdate = inventory[index];
    try {
      const updatedData = { ...itemToUpdate, quantity: itemToUpdate.quantity + 1 }; // Example update
      const updatedItem = await updateItem(itemToUpdate.id, updatedData);
      const updatedInventory = [...inventory];
      updatedInventory[index] = updatedItem;
      setInventory(updatedInventory);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleRemoveItem = async (index) => {
    const itemId = inventory[index].id;
    try {
      await deleteItem(itemId);
      const newInventory = inventory.filter((_, i) => i !== index);
      setInventory(newInventory);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Prepare data for Pie chart
  const pieData = {
    labels: inventory.map(item => item.name),
    datasets: [
      {
        label: 'Item Quantities',
        data: inventory.map(item => item.quantity),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div>
      <h1>Inventory</h1>
      <ul>
        {inventory.map((item, index) => (
          <li key={item.id}> {/* Use item.id as the key */}
            {item.name} (Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}) {/* Display price */}
            <button onClick={() => handleUpdateItem(index)}>Update</button>
            <button onClick={() => handleRemoveItem(index)}>Remove</button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        placeholder="Item Name"
      />
      <input
        type="number"
        value={newItem.quantity}
        onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) })}
        placeholder="Quantity"
      />
      <input
        type="number"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })} // Update price
        placeholder="Price"
      />
      <InventoryManager/>
      <button onClick={handleAddItem}>Add Item</button>

      {/* Render Pie Chart */}
      <div style={{ maxWidth: '600px', margin: '50px auto' }}>
        <h2>Inventory Distribution</h2>
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default InventoryList;
