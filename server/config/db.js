const { Pool } = require('pg');
require("dotenv").config();

// Veritabanı bağlantı bilgileri .env dosyasından okunur
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  options: "-c search_path=todo_db,public",
});

module.exports = pool;

module.exports = pool;
