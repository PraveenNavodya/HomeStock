const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Test route
app.get('/', (req, res) => {
  res.send('HomeStock Backend is Running');
});

// Routes (we’ll add real routes next)
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));

// Start server
const PORT = process.env.PORT || 8070;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
