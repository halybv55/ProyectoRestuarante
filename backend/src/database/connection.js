import pkg from "pg";
import env from "../config/env.js";

const { Pool } = pkg;

const useSSL = env.DB_HOST !== "localhost";

const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,

  ssl: useSSL ? { rejectUnauthorized: false } : false,

  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export default pool;
