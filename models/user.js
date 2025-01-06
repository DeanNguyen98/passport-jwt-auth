const pool = require("../config/database");

const User = {
    async findByUsername(username) {
      const query = "SELECT * FROM users WHERE username = $1";
      const { rows } = await pool.query(query, [username]);
      return rows[0];
    },
    
    async create(username, hash, salt) {
      const query = "INSERT INTO users (username, hash, salt) VALUES ($1, $2, $3) RETURNING *";
      const { rows } = await pool.query(query, [username, hash, salt]);
      return rows[0];
    }
};
  
module.exports = User;