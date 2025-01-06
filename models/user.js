const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

async function createUsersTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      hash TEXT NOT NULL,
      salt TEXT NOT NULL
    );
  `;
  try {
    await pool.query(query);
    console.log("Users table created successfully!");
  } catch (err) {
    console.error("Error creating users table:", err);
  }
}

createUsersTable();