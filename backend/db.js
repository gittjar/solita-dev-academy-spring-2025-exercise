const { Pool } = require('pg');

// Database connection configuration
const pool = new Pool({
  user: 'academy',
  host: 'localhost',
  database: 'electricity',
  password: 'academy',
  port: 5432,
});

module.exports = pool;