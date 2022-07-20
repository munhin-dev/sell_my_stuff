const db = require("../db");
const bcrypt = require("bcryptjs");

class User {
  static async create(body) {
    const [username, password, email, ...rest] = Object.values(body);
    const res = await db.query("SELECT * FROM customer WHERE username = $1 OR email = $2", [username, email]);
    if (res.rows.length !== 0) throw new Error("Account already exists!");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    db.query("INSERT INTO customer (username, password, email, first_name, last_name, mobile) VALUES ($1, $2, $3, $4, $5, $6)", [username, hash, email, ...rest]);
  }

  static async login(body) {
    const { username, password } = body;
    const users = await db.query("SELECT * FROM customer WHERE username=$1", [username]);
    if (!users.rows.length) throw new Error("Invalid username or password");
    const result = await bcrypt.compare(password, users.rows[0].password);
    if (!result) throw new Error("Invalid username or password");
    return users.rows[0];
  }

  static async get(id) {
    const user = db.query("SELECT username, email, first_name, last_name, mobile FROM customer WHERE id = $1", [id]);
    const address = db.query("SELECT * FROM customer_address WHERE customer_id= $1", [id]);
    return Promise.all([user, address]).then(([user, address]) => {
      return { user: user.rows[0], address: address.rows[0] };
    });
  }

  static async update(id, body) {
    const { first_name, last_name, mobile } = body;
    const user = await db.query("UPDATE customer SET first_name = $1, last_name = $2, mobile = $3 WHERE id = $4 RETURNING username, email, first_name, last_name, mobile ", [first_name, last_name, mobile, id]);
    return user.rows[0];
  }
}

module.exports = User;
