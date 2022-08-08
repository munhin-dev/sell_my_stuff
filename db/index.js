require("dotenv").config();
const { Pool } = require("pg");
let db;
if (process.env.NODE_ENV === "production") {
  db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  db = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });
}

module.exports = db;
