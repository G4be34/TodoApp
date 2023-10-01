import { Pool } from "pg";

const portVal = process.env.DB_PORT;

if (!portVal) {
  console.error("Error with obtaining DB port from env file");
  process.exit(-1);
}

const portNum = JSON.parse(portVal);

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: portNum,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000,
  max: 100,
  allowExitOnIdle: true
});

pool.on("error", (error) => {
  console.error("Error with database connection: ", error);
  process.exit(-1);
});

export default pool;