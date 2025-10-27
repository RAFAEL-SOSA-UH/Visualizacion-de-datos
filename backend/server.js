const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend funcionando!' });
});

app.listen(5000, () => console.log('Servidor backend corriendo en puerto 5000'));
