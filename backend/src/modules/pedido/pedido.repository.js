import pool from "../../database/connection.js";

export const create = async (pedido) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    /*==================================
      CREAR PEDIDO
    ==================================*/

    const pedidoQuery = `
      INSERT INTO pedido
      (
        tipo_pedido,
        total,
        idusuario,
        idmesa,
        idestado
      )
      VALUES
      (
        $1,$2,$3,$4,$5
      )
      RETURNING *;
    `;

    const pedidoResult = await client.query(pedidoQuery, [
      pedido.tipoPedido,
      pedido.total,
      pedido.idUsuario,
      pedido.idMesa,
      pedido.idEstado,
    ]);

    const pedidoGuardado = pedidoResult.rows[0];

    /*==================================
      DETALLE PEDIDO
    ==================================*/

    const detalleQuery = `
      INSERT INTO detallepedido
      (
        cantidad,
        precio_unitario,
        subtotal,
        observacion,
        idpedido,
        idplato,
        idbebida,
        idestadopedido
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7,$8
      );
    `;

    for (const detalle of pedido.detalles) {
      await client.query(detalleQuery, [
        detalle.cantidad,
        detalle.precioUnitario,
        detalle.subtotal,
        detalle.observacion,
        pedidoGuardado.idpedido,
        detalle.idPlato,
        detalle.idBebida,
        detalle.idEstadoPedido,
      ]);

      /*==================================
        DESCONTAR STOCK PLATO
      ==================================*/

      if (detalle.idPlato) {
        await client.query(
          `
          UPDATE detallemenu
          SET stock = stock - $1
          WHERE idplato = $2
            AND idmenu = (
              SELECT idmenu
              FROM menu_dia
              WHERE estado = 'ACTIVO'
              LIMIT 1
            );
          `,
          [detalle.cantidad, detalle.idPlato],
        );
      }

      /*==================================
        DESCONTAR STOCK BEBIDA
      ==================================*/

      if (detalle.idBebida) {
        await client.query(
          `
          UPDATE bebida
          SET stock_disponible = stock_disponible - $1
          WHERE idbebida = $2;
          `,
          [detalle.cantidad, detalle.idBebida],
        );
      }
    }

    await client.query("COMMIT");

    return pedidoGuardado;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
export const getAll = async () => {
  const query = `
    SELECT

      p.idpedido,
      p.codigo_pedido,
      p.tipo_pedido,
      p.fecha_hora,
      p.total,

      ep.nombre AS estado,

      m.numero AS mesa

    FROM pedido p

    INNER JOIN estadopedido ep
      ON ep.idestado = p.idestado

    LEFT JOIN mesa m
      ON m.idmesa = p.idmesa

    ORDER BY p.fecha_hora DESC;
  `;

  const { rows } = await pool.query(query);

  return rows;
};
export const getById = async (id) => {
  const query = `

    SELECT

      dp.iddetalle,

      dp.cantidad,

      dp.precio_unitario,

      dp.subtotal,

      dp.observacion,

      ep.nombre AS estado,

      pl.nombre AS plato,

      b.nombre AS bebida

    FROM detallepedido dp

    LEFT JOIN plato pl
      ON pl.idplato = dp.idplato

    LEFT JOIN bebida b
      ON b.idbebida = dp.idbebida

    INNER JOIN estadopedido ep
      ON ep.idestado = dp.idestadopedido

    WHERE dp.idpedido = $1

    ORDER BY dp.iddetalle;

  `;

  const { rows } = await pool.query(query, [id]);

  return rows;
};
export const getPendientes = async () => {
  const query = `
    SELECT
      p.idpedido,
      p.codigo_pedido,
      p.tipo_pedido,
      p.fecha_hora,

      m.numero AS mesa,

      dp.iddetalle,
      dp.cantidad,
      dp.observacion,

      pl.nombre AS plato,

      ep.nombre AS estado

    FROM pedido p

    INNER JOIN detallepedido dp
      ON dp.idpedido = p.idpedido

    INNER JOIN plato pl
      ON pl.idplato = dp.idplato

    INNER JOIN estadopedido ep
      ON ep.idestado = dp.idestadopedido

    LEFT JOIN mesa m
      ON m.idmesa = p.idmesa

    WHERE ep.nombre IN ('PENDIENTE','PREPARANDO')

    ORDER BY p.fecha_hora ASC;
  `;

  const { rows } = await pool.query(query);

  return rows;
};
export const updateEstadoDetalle = async (iddetalle, idEstado) => {
  const query = `
    UPDATE detallepedido
    SET idestadopedido = $1
    WHERE iddetalle = $2
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [idEstado, iddetalle]);

  return rows[0];
};
export const getListos = async () => {
  const query = `
    SELECT

      p.idpedido,

      m.numero AS mesa,

      dp.iddetalle,

      dp.cantidad,

      pl.nombre

    FROM pedido p

    INNER JOIN detallepedido dp
      ON dp.idpedido = p.idpedido

    INNER JOIN plato pl
      ON pl.idplato = dp.idplato

    INNER JOIN estadopedido ep
      ON ep.idestado = dp.idestadopedido

    LEFT JOIN mesa m
      ON m.idmesa = p.idmesa

    WHERE ep.nombre='LISTO'

    ORDER BY p.fecha_hora;
  `;

  const { rows } = await pool.query(query);

  return rows;
};
