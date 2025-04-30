import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/FormStyles.css';
import '../styles/TableFormStyles.css';

function InventoryList() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8070/api/inventory/')
      .then(res => setItems(res.data))
      .catch(err => console.error("Error fetching inventory:", err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:8070/api/inventory/delete/${id}`);
        setItems(items.filter(item => item._id !== id));
      } catch (err) {
        console.error('Error deleting item:', err);
        alert('Failed to delete item');
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2 className="page-title">Inventory</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.date?.split('T')[0]}</td>
                <td>{item.price}</td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      className="action-button"
                      onClick={() => navigate(`/edit-item/${item._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-button delete-button"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="form-buttons">
          <button
            className="form-button"
            onClick={() => alert('Generate Report clicked')}
          >
            Generate Report
          </button>
          <button
            className="form-button"
            onClick={() => navigate('/add-item')}
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryList;
