const db = require("../db");

class Order {
  static async getAll(id) {
    const response = await db.query("SELECT * from order_details where customer_id = $1 ORDER BY created_at DESC", [id]);
    return response.rows;
  }

  static async getById(id) {
    const response = await db.query("SELECT * from order_details where id = $1", [id]);
    return JSON.parse(response.rows[0].content);
  }

  static async getAllOrder() {
    const response = await db.query(
      "SELECT order_details.id, username, address_line1, address_line2, city, postal_code, country, shipped, content, order_details.created_at FROM order_details INNER JOIN customer ON order_details.customer_id = customer.id INNER JOIN customer_address ON customer_address.customer_id = customer.id ORDER BY created_at DESC"
    );
    return response.rows;
  }

  static async update(tracking_number, shipped, id) {
    await db.query("UPDATE order_details SET tracking_number = $1, shipped = $2 WHERE id = $3", [tracking_number, shipped, id]);
  }
}

module.exports = Order;
