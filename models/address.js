const db = require("../db");

const address = {
  async getByCustomerId(id) {
    const address = await db.query("Select * FROM customer_address WHERE customer_id = $1", [id]);
    return address.rows[0];
  },
  async update(customerId, addressLine1, addressLine2, city, postal_code, country) {
    return db.query("UPDATE customer_address SET address_line1 = $1, address_line2 = $2, city = $3, postal_code = $4,  country = $5 WHERE customer_id = $6", [addressLine1, addressLine2, city, postal_code, country, customerId]);
  },
  async create(customerId, addressLine1, addressLine2, city, postal_code, country) {
    return db.query("INSERT INTO customer_address ( customer_id, address_line1, address_line2, city, postal_code, country) VALUES ( $1, $2, $3, $4, $5, $6)", [customerId, addressLine1, addressLine2, city, postal_code, country]);
  },
};

module.exports = address;
