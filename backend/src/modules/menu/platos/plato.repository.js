import pool from "../../../database/connection.js";

export const getAll = async () => {
  const query = `
        SELECT
            p.idplato,
            p.nombre,
            p.descripcion,
            p.precio,
            p.activo,
            p.fecha_creacion,
            p.fecha_actualizacion,

            json_build_object(
                'id', c.idcategoria,
                'nombre', c.nombre
            ) AS categoria

        FROM plato p

        INNER JOIN categoria c
            ON c.idcategoria = p.idcategoria

        WHERE p.activo = true

        ORDER BY p.nombre;
    `;

  const { rows } = await pool.query(query);

  return rows;
};

export const getById = async (id) => {
  const query = `
        SELECT
            p.idplato,
            p.nombre,
            p.descripcion,
            p.precio,
            p.activo,

            json_build_object(
                'id', c.idcategoria,
                'nombre', c.nombre
            ) categoria

        FROM plato p

        INNER JOIN categoria c
            ON c.idcategoria = p.idcategoria

        WHERE p.idplato=$1

        LIMIT 1;
    `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};

export const create = async (data) => {
  const query = `

        INSERT INTO plato
        (

            nombre,
            descripcion,
            precio,
            idcategoria

        )

        VALUES

        (

            $1,
            $2,
            $3,
            $4

        )

        RETURNING *;

    `;

  const { rows } = await pool.query(query, [
    data.nombre,
    data.descripcion,
    data.precio,
    data.idcategoria,
  ]);

  return rows[0];
};

export const update = async (id, data) => {
  const query = `

        UPDATE plato

        SET

            nombre=$1,
            descripcion=$2,
            precio=$3,
            idcategoria=$4,
            fecha_actualizacion=NOW()

        WHERE idplato=$5

        RETURNING *;

    `;

  const { rows } = await pool.query(query, [
    data.nombre,
    data.descripcion,
    data.precio,
    data.idcategoria,
    id,
  ]);

  return rows[0];
};

export const remove = async (id) => {
  await pool.query(
    `

        UPDATE plato

        SET

            activo=false,
            fecha_eliminacion=NOW()

        WHERE idplato=$1

    `,
    [id],
  );
};
