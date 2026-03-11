require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// middleware
app.use(cors()); // allows React app on one port to talk to server on another port
app.use(express.json()); // allows server to understand JSON data

// PostgreSQL Connection Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS || undefined, 
  port: process.env.DB_PORT,
});

// API Route
app.get('/api/pokemon/random', async (req, res) => {
  try {
    const query = 'SELECT * FROM team ORDER BY RANDOM() LIMIT 6';
    const result = await pool.query(query); 
    
    // send the 6 db rows back to the React frontend as JSON
    res.json(result.rows); 
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to fetch Pokémon team' });
  }
});

// start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});