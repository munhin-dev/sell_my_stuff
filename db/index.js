const { Pool } = require("pg");
const db = new Pool({
  database: "sell_my_stuff",
  user: "postgres",
  password: "password",
});

module.exports = db;
