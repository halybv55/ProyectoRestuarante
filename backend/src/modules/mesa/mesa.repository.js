import pool from "../../database/connection.js";

export const getAll = async () => {
  const query = `
   SELECT
    idmesa,
    codigo,
    numero,
    capacidad,
    disponible
FROM mesa
ORDER BY numero;
  `;

  const { rows } = await pool.query(query);

  return rows;
};

export const getById = async (id) => {
  const query = `
    SELECT
    idmesa,
    codigo,
    numero,
    capacidad,
    disponible
FROM mesa
WHERE idmesa=$1
LIMIT 1;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};

export const create = async (data) => {
  const query = `
    INSERT INTO mesa
(
    numero,
    capacidad,
    disponible
)
VALUES
(
    $1,
    $2,
    $3
)
RETURNING *;
  `;

  const { rows } = await pool.query(query, [
    data.numero,
    data.capacidad,
    data.disponible,
  ]);

  return rows[0];
};

export const update = async (id, data) => {
  const query = `
   UPDATE mesa
SET
    numero=$1,
    capacidad=$2,
    disponible=$3
WHERE idmesa=$4
RETURNING *;
  `;

  const { rows } = await pool.query(query, [
    data.numero,
    data.capacidad,
    data.disponible,
    id
  ]);

  return rows[0];
};

export const remove = async (id) => {
  await pool.query(
    `
    UPDATE mesa
    SET activo = false
    WHERE idmesa = $1;
    `,
    [id],
  );
};
