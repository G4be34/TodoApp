const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: 'gabrieljimenez',
  database: "todoapp",
  password: "familia4eve",
  port: 5432,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000,
  max: 100,
  allowExitOnIdle: true
});

pool.on("error", (error) => {
  console.error("Error with database connection: ", error);
  process.exit(-1);
});

module.exports = pool;