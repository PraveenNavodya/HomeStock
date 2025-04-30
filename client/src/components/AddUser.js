import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/FormStyles.css';

function AddUser() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    role: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm({ fullName: '', email: '', phone: '', username: '', role: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.phone || !form.username || !form.role) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post('http://localhost:8070/api/users/add', form);
      alert("User added ✅");
      navigate('/users');
    } catch (err) {
      console.error("Error adding user:", err);
      alert("Failed to add user.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-field" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
          <input className="form-field" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input className="form-field" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
          <input className="form-field" name="username" placeholder="Username" value={form.username} onChange={handleChange} />
          <select className="form-field" name="role" value={form.role} onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="inventory manager">Inventory Manager</option>
            <option value="order manager">Order Manager</option>
            <option value="budget manager">Budget Manager</option>
          </select>

          <div className="form-buttons">
            <button type="button" onClick={handleReset} className="form-button reset-button">Reset</button>
            <button type="submit" className="form-button">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
