import pool from "./connection.js";

export const query = (text, params) => pool.query(text, params);

export default pool;
