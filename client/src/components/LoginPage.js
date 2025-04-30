import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/FormStyles.css';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8070/api/users/login', form);

      if (res.data.success) {
        alert('Login successful ✅');
        navigate('/inventory');
      } else {
        alert(res.data.message || 'Invalid credentials ❌');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Server error. Please try again.');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-field"
            name="email"
            type="text" // Changed to 'text' to prevent browser validation
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            className="form-field"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <div className="form-buttons">
            <button type="submit" className="form-button">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
