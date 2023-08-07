const pool = require("../utils/db");

async function setup() {
  try {
    const query2 = `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(100) NOT NULL,
      user_password VARCHAR(100) NOT NULL,
      name VARCHAR(30) NOT NULL UNIQUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );`;
    const query3 = `CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      date_created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      completed_date VARCHAR(30),
      todo_body TEXT NOT NULL,
      important BOOLEAN,
      username VARCHAR(30) NOT NULL,
      FOREIGN KEY (username) REFERENCES users(name)
    );`;

    await pool.query(query2);
    await pool.query(query3);

    console.log("Database and tables created successfully");
  } catch (error) {
    console.error("Error creating database/tables: ", error);
  }
};

setup();