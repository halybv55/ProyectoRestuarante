import pool from "../../../database/connection.js";

export const getAll = async () => {
  const query = `
        SELECT
            idcategoria,
            codigo_categoria,
            nombre,
            descripcion,
            activo
        FROM categoria
        WHERE activo = true
        ORDER BY nombre;
    `;

  const { rows } = await pool.query(query);

  return rows;
};

export const getById = async (id) => {
  const query = `
        SELECT
            idcategoria,
            codigo_categoria,
            nombre,
            descripcion,
            activo
        FROM categoria
        WHERE idcategoria = $1
        LIMIT 1;
    `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};

export const create = async ({ nombre, descripcion }) => {
  const query = `
        INSERT INTO categoria
        (
            nombre,
            descripcion
        )
        VALUES
        ($1,$2)
        RETURNING *;
    `;

  const { rows } = await pool.query(query, [nombre, descripcion]);

  return rows[0];
};

export const update = async (id, { nombre, descripcion }) => {
  const query = `
        UPDATE categoria
        SET
            nombre = $1,
            descripcion = $2
        WHERE idcategoria = $3
        RETURNING *;
    `;

  const { rows } = await pool.query(query, [nombre, descripcion, id]);

  return rows[0];
};

export const remove = async (id) => {
  const query = `
        UPDATE categoria
        SET activo = false
        WHERE idcategoria = $1;
    `;

  await pool.query(query, [id]);
};
