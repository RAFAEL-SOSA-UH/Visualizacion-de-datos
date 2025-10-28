const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a PostgreSQL usando las variables del docker-compose
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Endpoint de prueba (ya lo tienes)
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend funcionando!' });
});

// Endpoint para obtener los datos del CSV
app.get('/api/emissions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM co2_data LIMIT 100;');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al consultar la base de datos:', err);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

app.listen(5000, () => console.log('Servidor backend corriendo en puerto 5000'));
