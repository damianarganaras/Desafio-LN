const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Desafío LN - API de Catálogo',
      version: '1.0.0',
      description: 'API para el desafío técnico de La Nación - Node.js - Express - MySQL.'
    },
    components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            code: { type: 'integer' },
            message: { type: 'string' },
            description: { type: 'string' }
          },
          example: {
            code: 404,
            message: 'Not Found',
            description: 'El recurso no existe.'
          }
        },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            sku: { type: 'string' },
            descripcion_corta: { type: 'string' },
            descripcion_larga: { type: 'string' },
            qty: { type: 'integer' },
            ubicacion_imagen: { type: 'string' },
            fecha_creacion: { type: 'string', format: 'date-time' },
            precio: { type: 'number', format: 'float' },
            categoria: { type: 'string' }
          }
        },
        Order: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            fecha_circulacion: { type: 'string', format: 'date-time' },
            precio: { type: 'number', format: 'float' },
            producto_id: { type: 'integer' },
            cliente_id: { type: 'integer' },
            cantidad_solicitada: { type: 'integer' },
            cuit: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
