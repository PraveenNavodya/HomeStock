import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/FormStyles.css';
import '../styles/TableFormStyles.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      alert("Access denied 🚫");
      navigate('/login');
    }

    axios.get('http://localhost:8070/api/users/')
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users:", err));
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:8070/api/users/delete/${id}`);
        setUsers(users.filter(user => user._id !== id));
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user.");
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2 className="page-title">User List</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="action-button" onClick={() => navigate(`/edit-user/${user._id}`)}>Edit</button>
                    <button className="action-button delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="form-buttons">
          <button className="form-button" onClick={() => alert('Generate Report clicked')}>Generate Report</button>
          <button className="form-button" onClick={() => navigate('/add-user')}>Add User</button>
        </div>
      </div>
    </div>
  );
}

export default UserList;
