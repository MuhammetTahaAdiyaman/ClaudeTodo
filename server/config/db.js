const { Pool } = require('pg');

// Veritabanı bağlantı bilgileri .env dosyasından okunur
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Sorgular DB_SCHEMA içindeki tablolarda çalışır (belirtilmezse "public")
  options: `-c search_path=${process.env.DB_SCHEMA || 'public'}`,
});

module.exports = pool;
