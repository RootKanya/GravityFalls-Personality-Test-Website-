const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(cors());
app.use(express.json());
   
// Import Routes
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.get('/', (req, res) => {
    res.send('Gravity Falls Server is Running! ');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    require('./config/db');
});