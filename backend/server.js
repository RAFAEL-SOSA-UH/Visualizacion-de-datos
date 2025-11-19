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

// Endpoint para obtener los datos del CSV
app.get('/api/emissions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM co2_data;');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al consultar la base de datos:', err);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

//otorgar todos los países
app.get("/api/countries", async (req, res) => {
  try {
    const result = await pool.query("SELECT DISTINCT entity FROM co2_data ORDER BY entity ASC;");
    res.json(result.rows);
  } catch (err) {
    console.error("Error cargando países:", err);
    res.status(500).json({ error: "No se pudieron obtener los países" });
  }
});


//filtrar por países y year
app.get("/api/emissions/filter", async (req, res) => {
  try {
    const { yearMin, yearMax, countries } = req.query;

    let query = "SELECT * FROM co2_data";
    const params = [];
    let conditions = [];

    // Filtro de años
    if (yearMin) {
      params.push(Number(yearMin));
      conditions.push(`year >= $${params.length}`);
    }

    if (yearMax) {
      params.push(Number(yearMax));
      conditions.push(`year <= $${params.length}`);
    }

    // Filtro de países
    if (countries) {
      const list = countries.split(",");
      params.push(list);
      conditions.push(`entity = ANY($${params.length})`);
    }

    // Combinar condiciones
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    const result = await pool.query(query, params);
    res.json(result.rows);

  } catch (err) {
    console.error("Error combinando filtros:", err);
    res.status(500).json({ error: "Error al obtener datos filtrados" });
  }
});


app.listen(5000, () => console.log('Servidor backend corriendo en puerto 5000'));
