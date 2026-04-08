const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const profileRoutes = require('./routes/profile');
const newsletterRoutes = require('./routes/newsletter');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/UserAuth');

const app = express();

// Middleware
app.use(express.json());

// Enhanced CORS to handle both www and non-www
const allowedOrigins = [
  "https://www.inanst.com",
  "https://inanst.com",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Routes for the Api
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Hi, Wasem! you are connected to MongoDB Atlas'))
  .catch((err) => console.error('Hi, Wasem! MongoDB Connection Error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Hi, Wasem! Server running on port ${PORT}`);
});