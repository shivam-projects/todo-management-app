import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();


const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

console.log(process.env.DB_URL)

export default pool;