const express = require('express');
const config = require('./config');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/product', productRoutes);
app.use('/order', orderRoutes);

app.use(errorHandler);

module.exports = app;
