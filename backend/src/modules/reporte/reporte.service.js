import * as repository from "./reporte.repository.js";

export const ventasDiarias = async () => {
  return await repository.ventasDiarias();
};

export const ventasSemanales = async () => {
  return await repository.ventasSemanales();
};

export const gananciaSemanal = async () => {
  return await repository.gananciaSemanal();
};

export const platosMasVendidos = async () => {
  return await repository.platosMasVendidos();
};

export const comprasSemanales = async () => {
  return await repository.comprasSemanales();
};
