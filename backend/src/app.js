const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// CORS Configuration - Allow all origins for development
const corsOptions = {
  origin: true, // Reflects the request origin
  credentials: false, // Not needed for token-based auth
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api', apiRoutes);
app.use('/api/assessment', require('./routes/assessmentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.get('/', (req, res) => {
  res.send('HealBharat API is running');
});

const PORT = process.env.PORT || 5050;

// Only start server if not imported (for testing)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;

