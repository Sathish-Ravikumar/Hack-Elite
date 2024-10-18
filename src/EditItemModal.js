// EditItemModal.js
import React, { useState, useEffect } from 'react';
import './EditItemModal.css'; // Create a CSS file for styling (optional)

const EditItemModal = ({ isOpen, onClose, item, onSave }) => {
  const [updatedItem, setUpdatedItem] = useState({ name: '', quantity: 0 });

  useEffect(() => {
    if (item) {
      setUpdatedItem(item);
    }
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(updatedItem);
    onClose(); // Close the modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Item</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={updatedItem.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={updatedItem.quantity}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditItemModal;
