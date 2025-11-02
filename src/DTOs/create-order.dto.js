const createOrderDto = {
  producto_id: { type: 'number', required: true },
  cliente_id: { type: 'number', required: true },
  cantidad_solicitada: { type: 'number', required: true }
};

module.exports = createOrderDto;
