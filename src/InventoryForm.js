import React, { useState, useEffect } from 'react';

function InventoryForm({ addItem, updateItem, existingItem }) {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (existingItem) {
      setItemName(existingItem.name);
      setQuantity(existingItem.quantity);
      setPrice(existingItem.price);
    } else {
      setItemName('');
      setQuantity('');
      setPrice('');
    }
  }, [existingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      name: itemName,
      quantity: Number(quantity),
      price: parseFloat(price),
    };

    if (existingItem) {
      updateItem(existingItem.id, item);
    } else {
      addItem(item);
    }

    setItemName('');
    setQuantity('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        step="0.01"
      />
      <button type="submit">{existingItem ? 'Update Item' : 'Add Item'}</button>
    </form>
  );
}

export default InventoryForm;
