const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const commercializationProjectRoutes = require('./routes/commercializationProjectRoutes');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const patentRoutes = require('./routes/patentRoutes');
const publicationRoutes = require('./routes/publicationRoutes');
const fundingRoutes = require('./routes/fundingRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Load environment variables
dotenv.config();



const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));

// Connect to MongoDB using the URI from .env file
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', commercializationProjectRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/patents', patentRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/fundings', fundingRoutes);
app.use('/api/reports', reportRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});