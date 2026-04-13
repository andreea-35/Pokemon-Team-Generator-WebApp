require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// middleware
app.use(cors()); // allows React app on one port to talk to server on another port
app.use(express.json()); // allows server to understand JSON data

// Supabase Connection Pool
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// API Route
app.get('/api/pokemon', async (req, res) => {
  try {
    const query = 'SELECT * FROM pokemon ORDER BY id ASC';
    const result = await pool.query(query); 
    
    // send all pokemon back to the React frontend as JSON
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