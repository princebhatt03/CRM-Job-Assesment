require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// --- Database Connection ---
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('FATAL ERROR: MONGO_URI is not defined in .env file');
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();

// --- Routes ---
app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));
app.use('/api/opportunities', require('./routes/opportunityRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/files', require('./routes/fileRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));

// --- Server ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`Server running on port ${PORT}`)
);
