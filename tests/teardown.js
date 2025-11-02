const { closePool } = require('../src/config/database');

module.exports = async () => {
  await closePool();
};