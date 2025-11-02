const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('El servidor ATR funcionando piola');
});

app.listen(port, () => {
  console.log(`Escuchando servidor en http://localhost:${port}`);
});