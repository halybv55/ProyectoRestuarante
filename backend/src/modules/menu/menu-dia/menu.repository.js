import pool from "../../../database/connection.js";

export const getAll = async () => {
  const query = `
        SELECT
            idmenu,
            codigo_menu,
            fecha,
            estado
        FROM menu_dia
        ORDER BY fecha DESC;
    `;

  const { rows } = await pool.query(query);

  return rows;
};

export const getById = async (id) => {
  const query = `
        SELECT
            idmenu,
            codigo_menu,
            fecha,
            estado
        FROM menu_dia
        WHERE idmenu=$1
        LIMIT 1;
    `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};

export const getActivo = async () => {
  const query = `
        SELECT
            idmenu,
            codigo_menu,
            fecha,
            estado
        FROM menu_dia
        WHERE estado = 'ACTIVO'
        LIMIT 1;
    `;

  const { rows } = await pool.query(query);

  return rows[0];
};

export const create = async (fecha) => {
  const query = `
        INSERT INTO menu_dia
        (
            fecha,
            estado
        )
        VALUES
        (
            $1,
            'ACTIVO'
        )
        RETURNING *;
    `;

  const { rows } = await pool.query(query, [fecha]);

  return rows[0];
};

export const cerrar = async (id) => {
  const query = `
        UPDATE menu_dia
        SET estado = 'CERRADO'
        WHERE idmenu = $1
        RETURNING *;
    `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};
