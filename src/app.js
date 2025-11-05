const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const authMiddleware = require('./middleware/auth.middleware');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/product', authMiddleware, productRoutes);
app.use('/order', authMiddleware, orderRoutes);

app.use(errorHandler);

module.exports = app;
