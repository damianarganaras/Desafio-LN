const express = require('express');
const config = require('./config');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();
const port = config.api.port;

app.use(express.json());

app.use('/product', productRoutes);
app.use('/order', orderRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});