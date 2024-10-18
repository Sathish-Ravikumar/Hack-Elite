import React, { useState } from 'react';

function InventoryManager() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item A', quantity: 10, price: 5.99 },
    { id: 2, name: 'Item B', quantity: 20, price: 9.99 },
  ]);
  const [editingItem, setEditingItem] = useState(null);

  // Function to add a new item
  const addItem = (item) => {
    setItems([...items, { id: Date.now(), ...item }]); // Adding a new item with a unique ID
  };

  // Function to update an existing item
  const updateItem = (id, updatedItem) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
    setEditingItem(null); // Clear the editing item after update
  };

  // Function to handle editing an item
  const handleEdit = (item) => {
    setEditingItem(item);
  };

  // Function to delete an item (optional)
  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h2>Inventory Manager</h2>

      {/* Inventory Form for adding or editing */}
      {/* <InventoryForm
        addItem={addItem}
        updateItem={updateItem}
        existingItem={editingItem}
      /> */}

      <h3>Inventory List</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryManager;
