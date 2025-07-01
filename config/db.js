const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  options: {
    trustServerCertificate: true,
    encrypt: false
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('🔥🎶👾👁️ Conectado a servidor_Privado Caballero Urrego');
    return pool;
  })
  .catch(err => {
    console.error('❌ Error al conectar a SQL Server:', err.message);
  });

module.exports = {
  sql,
  poolPromise
};
