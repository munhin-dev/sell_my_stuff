const db = require("../db");

const cart = {
  async create(id, content) {
    await db.query("INSERT INTO cart_item (customer_id, content) VALUES ($1, $2)", [id, content]);
  },
  async get(id) {
    const response = await db.query("SELECT * from cart_item where customer_id = $1", [id]);
    return response.rows[0];
  },
  async delete(id) {
    return db.query("DELETE from cart_item where customer_id = $1", [id]);
  },
  async update(id, content) {
    return db.query("UPDATE cart_item SET content = $2 WHERE customer_id = $1", [id, content]);
  },
};

module.exports = cart;
