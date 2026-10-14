// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// // Load environment variables from .env file
// dotenv.config();

// // Initialize Express App
// const app = express();

// // Connect to MongoDB Database
// connectDB();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Test Route
// app.get('/', (req, res) => {
//   res.json({ message: 'Dropido Drop Taxi API is up and running successfully!' });
// });

// // Define Port
// const PORT = process.env.PORT || 5000;

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Route Imports
const bookingRoutes = require('./routes/bookingRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize Express App
const app = express();

// Connect to MongoDB Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Dropido Drop Taxi API is up and running successfully!' });
});

// API Routes
app.use('/api/bookings', bookingRoutes);

// Define Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});