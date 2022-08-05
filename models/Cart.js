const db = require("../db");

class Cart {
  static async get(id) {
    const response = await db.query("SELECT * from cart_item where customer_id = $1", [id]);
    return response.rows;
  }

  static async createUpdate(id, content) {
    const cart = await Cart.get(id);
    cart.length === 0 ? await db.query("INSERT INTO cart_item (customer_id, content) VALUES ($1, $2)", [id, content]) : await db.query("UPDATE cart_item SET content = $2 WHERE customer_id = $1", [id, content]);
  }
}

module.exports = Cart;
