import pool from "../../../database/connection.js";

export const addPlatos = async (idmenu, platos) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const query = `
            INSERT INTO detallemenu
            (
                stock,
                activo,
                idmenu,
                idplato
            )
            VALUES
            (
                $1,
                true,
                $2,
                $3
            );
        `;

    for (const plato of platos) {
      await client.query(query, [plato.stock, idmenu, plato.idplato]);
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
};

export const getByMenu = async (idmenu) => {
  const query = `
        SELECT

            dm.iddetalle_menu,
            dm.stock,
            dm.activo,

            p.idplato,
            p.nombre,
            p.descripcion,
            p.precio,

            json_build_object(
                'id',c.idcategoria,
                'nombre',c.nombre
            ) categoria

        FROM detallemenu dm

        INNER JOIN plato p
            ON p.idplato = dm.idplato

        INNER JOIN categoria c
            ON c.idcategoria = p.idcategoria

        WHERE dm.idmenu = $1
        AND dm.activo = true

        ORDER BY p.nombre;
    `;

  const { rows } = await pool.query(query, [idmenu]);

  return rows;
};

export const updateStock = async (iddetalle, stock) => {
  const query = `
        UPDATE detallemenu
        SET stock = $1
        WHERE iddetalle_menu = $2
        RETURNING *;
    `;

  const { rows } = await pool.query(query, [stock, iddetalle]);

  return rows[0];
};

export const remove = async (iddetalle) => {
  await pool.query(
    `
        UPDATE detallemenu
        SET activo = false
        WHERE iddetalle_menu = $1;
        `,
    [iddetalle],
  );
};
