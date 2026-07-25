import pool from "../../../database/connection.js";

export const create = async (data) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const comboQuery = `
            INSERT INTO combo
            (
                nombre,
                descripcion,
                precio
            )
            VALUES
            ($1,$2,$3)
            RETURNING *;
        `;

    const comboResult = await client.query(comboQuery, [
      data.nombre,
      data.descripcion,
      data.precio,
    ]);

    const combo = comboResult.rows[0];

    const detalleQuery = `
            INSERT INTO detallecombo
            (
                idcombo,
                idplato,
                cantidad
            )
            VALUES
            ($1,$2,$3);
        `;

    for (const plato of data.platos) {
      await client.query(detalleQuery, [
        combo.idcombo,
        plato.idplato,
        plato.cantidad,
      ]);
    }

    await client.query("COMMIT");

    return combo;
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
};
export const getById = async (id) => {
  const query = `
    SELECT
      idcombo,
      nombre,
      descripcion,
      precio,
      activo,
      idmenu
    FROM combo
    WHERE idcombo = $1
      AND activo = true
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};

export const getDetalleCombo = async (id) => {
  const query = `
    SELECT
      dc.idplato,
      dc.cantidad,
      p.nombre,
      p.precio
    FROM detallecombo dc
    INNER JOIN plato p
      ON p.idplato = dc.idplato
    WHERE dc.idcombo = $1;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows;
};
