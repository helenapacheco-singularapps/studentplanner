import { Pool } from "pg";

export const pool = new Pool({
  connectionString: "postgres://postgres:helena@2005@localhost:5432/studentplanner",
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS disciplines (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      status VARCHAR(50) NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS grades (
      id SERIAL PRIMARY KEY,
      value NUMERIC(5,2) NOT NULL,
      discipline_id INTEGER NOT NULL,
      FOREIGN KEY (discipline_id) REFERENCES disciplines(id) ON DELETE CASCADE
    );
  `);

  console.log("Tabelas criadas com sucesso");

}

