import pool from "../../database/connection.js";

export const ventasDiarias = async () => {
  const { rows } = await pool.query(`SELECT * FROM vw_ventas_diarias;`);

  return rows;
};

export const ventasSemanales = async () => {
  const { rows } = await pool.query(`SELECT * FROM vw_ventas_semanales;`);

  return rows;
};

export const gananciaSemanal = async () => {
  const { rows } = await pool.query(`SELECT * FROM vw_ganancia_semanal;`);

  return rows;
};

export const platosMasVendidos = async () => {
  const { rows } = await pool.query(`SELECT * FROM vw_platos_mas_vendidos;`);

  return rows;
};

export const comprasSemanales = async () => {
  const { rows } = await pool.query(`SELECT * FROM vw_compras_semanales;`);

  return rows;
};
