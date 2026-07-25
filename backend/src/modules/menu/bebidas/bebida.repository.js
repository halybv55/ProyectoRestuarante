import pool from "../../../database/connection.js";

export const getAll = async () => {
  const query = `
    SELECT
      idbebida,
      codigo,
      tipo_bebida,
      nombre,
      precio,
      stock_total,
      stock_disponible,
      stock_minimo,
      activo
    FROM bebida
    WHERE activo = true
    ORDER BY nombre;
  `;

  const { rows } = await pool.query(query);

  return rows;
};

export const getById = async (id) => {
  const query = `
    SELECT
      idbebida,
      codigo,
      tipo_bebida,
      nombre,
      precio,
      stock_total,
      stock_disponible,
      stock_minimo,
      activo
    FROM bebida
    WHERE idbebida = $1
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};

export const create = async (data) => {
  const query = `
    INSERT INTO bebida
    (
      tipo_bebida,
      nombre,
      precio,
      stock_total,
      stock_disponible,
      stock_minimo
    )
    VALUES
    ($1,$2,$3,$4,$5,$6)
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [
    data.tipo_bebida,
    data.nombre,
    data.precio,
    data.stock_total,
    data.stock_disponible,
    data.stock_minimo,
  ]);

  return rows[0];
};

export const update = async (id, data) => {
  const query = `
    UPDATE bebida
    SET
      tipo_bebida = $1,
      nombre = $2,
      precio = $3,
      stock_total = $4,
      stock_disponible = $5,
      stock_minimo = $6
    WHERE idbebida = $7
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [
    data.tipo_bebida,
    data.nombre,
    data.precio,
    data.stock_total,
    data.stock_disponible,
    data.stock_minimo,
    id,
  ]);

  return rows[0];
};

export const remove = async (id) => {
  await pool.query(
    `
    UPDATE bebida
    SET activo = false
    WHERE idbebida = $1;
    `,
    [id],
  );
};
