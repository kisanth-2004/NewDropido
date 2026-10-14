
// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// // Route Imports
// const bookingRoutes = require('./routes/bookingRoutes');

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

// // API Routes
// app.use('/api/bookings', bookingRoutes);

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

// CORS Settings - Netlify மற்றும் Localhost அனுமதிக்க
const allowedOrigins = [
  'https://stellular-truffle-3827b2.netlify.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    // origin இல்லாவிட்டாலோ (Postman/mobile apps) அல்லது allowed list-ல் இருந்தாலோ allow செய்யும்
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Pre-flight OPTIONS request-களை அனுமதிக்கும்
app.use(express.json());

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

