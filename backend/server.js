const express = require('express');
const cors = require('cors');
const pool = require('./db');
const path = require('path');

const app = express();
// Localhost port for development
const port = 3000;
// Docker port for production = 3001


// Enable CORS with explicit configuration
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Serve static files from the current directory
app.use(express.static(__dirname));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Electricity API!');
});

// Serve favicon
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'favicon.ico'));
});

// Data route
app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM electricitydata');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error querying the database');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`                                           
Server is running at http://localhost:${port} and serving static files from ${__dirname}...`);
  console.log(`

  `);
});