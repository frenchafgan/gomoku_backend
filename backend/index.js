const express = require('express');
const app = express();
const PORT = 3001;
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/game'); // Import gameRoutes
const authorize = require('./middleware/middleware');
const mongoose = require('mongoose');

//Enable CORS for all routes
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // to support cookies
};

app.use(cors(corsOptions));

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/gomoku', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');

    // Use auth routes
    app.use('/auth', authRoutes);

    // Use game routes
    app.use('/game', gameRoutes); // Register gameRoutes

    // Example protected route
    app.get('/protected', authorize, (req, res) => {
      res.send('This is a protected route');
    });

    // Root route
    app.get('/', (req, res) => {
      res.send('Hello, World!');
    });

    // Global error-handling middleware (optional)
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB', err);
  });
