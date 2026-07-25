import pool from "../../database/connection.js";

export const create = async (data) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Obtener el pedido
    const pedidoResult = await client.query(
      `
      SELECT total
      FROM pedido
      WHERE idpedido = $1;
      `,
      [data.idPedido],
    );

    if (pedidoResult.rows.length === 0) {
      throw new Error("Pedido no encontrado.");
    }

    const subtotal = Number(pedidoResult.rows[0].total);

    const descuento = Number(data.descuento ?? 0);

    const total = subtotal - descuento;

    const ventaResult = await client.query(
      `
      INSERT INTO venta
      (
        subtotal,
        descuento,
        total,
        idpedido,
        idmetodopago
      )
      VALUES
      (
        $1,$2,$3,$4,$5
      )
      RETURNING *;
      `,
      [subtotal, descuento, total, data.idPedido, data.idMetodoPago],
    );

    await client.query("COMMIT");

    return ventaResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
