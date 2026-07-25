import pool from "../../database/connection.js";

export const getAccounts = async () => {
  const query = `
        SELECT
            u.codigo,
            u.username,
            r.nombre
        FROM usuario u
        INNER JOIN rol r
            ON u.idrol = r.idrol
        WHERE u.activo=true
        ORDER BY u.idrol;
    `;

  const { rows } = await pool.query(query);

  return rows;
};

export const findByUsername = async (username) => {
  const query = `
        SELECT
            u.idusuario,
            u.codigo,
            u.username,
            u.password,
            r.idrol,
            r.nombre AS rol
        FROM usuario u
        INNER JOIN rol r
            ON r.idrol=u.idrol
        WHERE LOWER(u.username)=LOWER($1)
        LIMIT 1;
    `;

  const { rows } = await pool.query(query, [username]);

  return rows[0];
};
