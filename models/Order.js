const db = require("../db");

class Order {
  static async getAll(id) {
    const response = await db.query(
      "SELECT * from order_details where customer_id = $1 ORDER BY created_at DESC",
      [id]
    );
    return response.rows;
  }

  static async getById(id) {
    const response = await db.query(
      "SELECT * from order_details where id = $1",
      [id]
    );
    return JSON.parse(response.rows[0].content);
  }
}

module.exports = Order;
