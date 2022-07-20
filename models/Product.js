const db = require("../db");

class Product {
  static async getAll() {
    const products = await db.query("SELECT * from Product ORDER BY id ASC");
    return products.rows;
  }

  static async getById(id) {
    const product = await db.query("SELECT * from Product WHERE id =$1", [id]);
    return product.rows[0];
  }

  static async getByCategory(category) {
    const products = await db.query("SELECT * from Product where category_id = $1", [category]);
    return products.rows;
  }
}

module.exports = Product;
