const db = require("../db");

const order = {
  async getAll() {
    const response = await db.query("SELECT order_details.id, username, address_line1, address_line2, city, postal_code, country, shipped, content, order_details.created_at FROM order_details INNER JOIN customer ON order_details.customer_id = customer.id INNER JOIN customer_address ON customer_address.customer_id = customer.id ORDER BY created_at DESC");
    return response.rows;
  },
  async getAllByCustomerId(customer_id) {
    const response = await db.query("SELECT * from order_details where customer_id = $1 ORDER BY created_at DESC", [customer_id]);
    return response.rows;
  },
  async getOneById(id) {
    const response = await db.query("SELECT * from order_details where id = $1", [id]);
    return response.rows[0];
  },
  update(tracking_number, shipped, id) {
    return db.query("UPDATE order_details SET tracking_number = $1, shipped = $2 WHERE id = $3", [tracking_number, shipped, id]);
  },

  async create(id, content) {
    const response = await db.query("INSERT into order_details (customer_id, content, shipped) VALUES ($1, $2, $3) RETURNING *", [id, content, false]);
    return response.rows[0];
  },
};

module.exports = order;
