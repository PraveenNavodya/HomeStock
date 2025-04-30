import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/FormStyles.css';

function AddItem() {
  const [form, setForm] = useState({
    name: '',
    category: '',
    quantity: '',
    date: '',
    price: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm({ name: '', category: '', quantity: '', date: '', price: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.quantity || !form.date || !form.price) {
      alert("Please fill all the fields!");
      return;
    }

    if (form.quantity <= 0 || form.price <= 0) {
      alert("Quantity and price must be greater than 0.");
      return;
    }

    try {
      await axios.post('http://localhost:8070/api/inventory/add', form);
      alert("Item added ✅");
      handleReset();
      navigate('/inventory');
    } catch (err) {
      console.error("Error adding item:", err);
      alert("Failed to add item.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-field" name="name" placeholder="Item Name" value={form.name} onChange={handleChange} />
          <select className="form-field" name="category" value={form.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Electronics">Electronics</option>
          </select>
          <input className="form-field" name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
          <input className="form-field" name="date" type="date" value={form.date} onChange={handleChange} />
          <input className="form-field" name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />

          <div className="form-buttons">
            <button type="button" onClick={handleReset} className="form-button reset-button">Reset</button>
            <button type="submit" className="form-button">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
