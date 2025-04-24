// filepath: c:\Ohjelmointi\solita-dev-academy-spring-2025-exercise\backend\server.js
const express = require('express');
const cors = require('cors'); // Import CORS
const pool = require('./db');
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors());

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

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});