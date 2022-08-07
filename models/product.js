const db = require("../db");

const product = {
  addProduct(name, description, category, quantity, price, image) {
    return db.query("INSERT INTO Product (name, description, category_id, quantity, price, image) VALUES ($1, $2, $3, $4, $5, $6)", [name, description, category, quantity, price, image]);
  },
  updateProduct(name, description, category, quantity, price, image, item_id) {
    return db.query("UPDATE Product SET name = $1, description = $2, category_id = $3, quantity = $4, price = $5, image = $6 WHERE id = $7", [name, description, category, quantity, price, image, item_id]);
  },

  updateInventory(quantity, itemId) {
    return db.query("UPDATE Product SET quantity = quantity - $1 WHERE id =$2", [quantity, itemId]);
  },
  async getAll() {
    const products = await db.query("SELECT * from Product ORDER BY id ASC");
    return products.rows;
  },
  async getOneById(id) {
    const product = await db.query("SELECT * from Product WHERE id =$1", [id]);
    return product.rows[0];
  },
  async getByCategory(category) {
    const products = await db.query("SELECT * from Product where category_id = $1", [category]);
    return products.rows;
  },
};

module.exports = product;
