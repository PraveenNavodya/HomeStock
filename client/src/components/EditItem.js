import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/FormStyles.css';

function EditItem() {
  const [form, setForm] = useState({
    name: '',
    category: '',
    quantity: '',
    date: '',
    price: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:8070/api/inventory/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error('Error fetching item:', err);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm({ name: '', category: '', quantity: '', date: '', price: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8070/api/inventory/update/${id}`, form);
      alert('Item updated ✅');
      navigate('/inventory');
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>Edit Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input className="form-field" name="name" placeholder="Item Name" value={form.name} onChange={handleChange} />
            <select className="form-field" name="category" value={form.category} onChange={handleChange}>
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>
          <div className="form-row">
            <input className="form-field" name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
            <input className="form-field" name="date" type="date" value={form.date} onChange={handleChange} />
          </div>
          <input className="form-field" name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />

          <div className="form-buttons">
            <button type="button" onClick={handleReset} className="form-button reset-button">Reset</button>
            <button type="submit" className="form-button">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItem;
