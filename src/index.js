const app = require('./app');
const config = require('./config');

const port = config.api.port;

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
