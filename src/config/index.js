const config = {
  api: {
    port: process.env.PORT || 3000,
    apiKey: process.env.API_KEY || 'mi-api-key-secreta-123'
  },
  
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
};

module.exports = config;