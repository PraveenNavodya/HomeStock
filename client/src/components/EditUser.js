import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/FormStyles.css';

function EditUser() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    role: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8070/api/users/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm({ fullName: '', email: '', phone: '', username: '', role: '' });
  };

  const validateForm = () => {
    const { fullName, email, phone, username, role } = form;
    const emailPattern = /^[\\w.-]+@[\\w.-]+\\.\\w+$/;
    const phonePattern = /^[0-9]{10,15}$/;

    if (!fullName || !email || !phone || !username || !role) {
      alert("Please fill in all fields.");
      return false;
    }

    if (!emailPattern.test(email)) {
      alert("Enter a valid email address.");
      return false;
    }

    if (!phonePattern.test(phone)) {
      alert("Enter a valid phone number (10-15 digits).");
      return false;
    }

    if (username.includes(" ")) {
      alert("Username should not contain spaces.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.put(`http://localhost:8070/api/users/update/${id}`, form);
      alert("User updated ✅");
      navigate('/users');
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>Edit User</h2>
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
            <button type="submit" className="form-button">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
