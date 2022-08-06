const db = require("../db");

const address = {
  async getByCustomerId(id) {
    const address = await db.query("Select * FROM customer_address WHERE customer_id = $1", [id]);
    return address.rows[0];
  },
  async update(id, address) {
    return db.query("UPDATE customer_address SET  WHERE customer_id = $1", [])
  },
  async create(id, address) {}

};

module.exports = address;