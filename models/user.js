const db = require("../db");
const bcrypt = require("bcryptjs");

const user = {
  async create(body) {
    const { username, password, email, first_name, last_name, mobile } = body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return db.query(
      "INSERT INTO customer (username, password, email, first_name, last_name, mobile) VALUES ($1, $2, $3, $4, $5, $6)",
      [username, hash, email, first_name, last_name, mobile]
    );
  },
  async getByUserId(id) {
    const res = await db.query(
      "SELECT username, email, first_name, last_name, mobile FROM customer WHERE id = $1",
      [id]
    );
    return res.rows[0];
  },
  async getByEmail(email) {
    const res = await db.query("SELECT * FROM customer WHERE email = $1", [
      email,
    ]);
    return res.rows[0];
  },
  async getByUsername(username) {
    const res = await db.query("SELECT * FROM customer WHERE username = $1", [
      username,
    ]);
    return res.rows[0];
  },
  async update(first_name, last_name, mobile, id) {
    return db.query(
      "UPDATE customer SET first_name = $1, last_name = $2, mobile = $3 WHERE id = $4",
      [first_name, last_name, mobile, id]
    );
  },
};

module.exports = user;
