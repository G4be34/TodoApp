const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: 'gabrieljimenez',
  database: "todoapp",
  port: 5432,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000,
  max: 100,
  allowExitOnIdle: true
});

module.exports = pool;