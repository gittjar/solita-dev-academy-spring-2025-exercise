const { Pool } = require('pg');

// Database connection configuration
const pool = new Pool({
  user: process.env.DB_USER || 'academy',
  host: process.env.DB_HOST || 'localhost', // Use 'db' when running in Docker
  database: process.env.DB_NAME || 'electricity',
  password: process.env.DB_PASSWORD || 'academy',
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;