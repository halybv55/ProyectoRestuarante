import * as service from "./reporte.service.js";
import { success } from "../../shared/responses/apiResponse.js";
import { generarExcel } from "../../shared/services/excel.service.js";

export const ventasDiarias = async (req, res, next) => {
  try {
    return res.json(success(await service.ventasDiarias()));
  } catch (error) {
    next(error);
  }
};

export const ventasSemanales = async (req, res, next) => {
  try {
    return res.json(success(await service.ventasSemanales()));
  } catch (error) {
    next(error);
  }
};

export const gananciaSemanal = async (req, res, next) => {
  try {
    return res.json(success(await service.gananciaSemanal()));
  } catch (error) {
    next(error);
  }
};

export const platosMasVendidos = async (req, res, next) => {
  try {
    return res.json(success(await service.platosMasVendidos()));
  } catch (error) {
    next(error);
  }
};

export const comprasSemanales = async (req, res, next) => {
  try {
    return res.json(success(await service.comprasSemanales()));
  } catch (error) {
    next(error);
  }
};
export const ventasDiariasExcel = async (req, res, next) => {
  try {
    const datos = await service.ventasDiarias();

    await generarExcel(
      "Ventas Diarias",
      [
        {
          header: "Fecha",
          key: "fecha",
        },
        {
          header: "Cantidad Ventas",
          key: "cantidad_ventas",
        },
        {
          header: "Total",
          key: "total",
        },
      ],
      datos,
      res,
      "ventas_diarias",
    );
  } catch (error) {
    next(error);
  }
};
export const ventasSemanalesExcel = async (req, res, next) => {
  try {
    const datos = await service.ventasSemanales();

    await generarExcel(
      "Ventas Semanales",
      [
        {
          header: "Semana",
          key: "semana",
        },
        {
          header: "Ventas",
          key: "ventas",
        },
        {
          header: "Total",
          key: "total",
        },
      ],
      datos,
      res,
      "ventas_semanales",
    );
  } catch (error) {
    next(error);
  }
};
export const gananciaSemanalExcel = async (req, res, next) => {
  try {
    const datos = await service.gananciaSemanal();

    await generarExcel(
      "Ganancia Semanal",
      [
        {
          header: "Semana",
          key: "semana",
        },
        {
          header: "Ganancia",
          key: "ganancia",
        },
      ],
      datos,
      res,
      "ganancia_semanal",
    );
  } catch (error) {
    next(error);
  }
};
export const platosMasVendidosExcel = async (req, res, next) => {
  try {
    const datos = await service.platosMasVendidos();

    await generarExcel(
      "Platos Más Vendidos",
      [
        {
          header: "Plato",
          key: "nombre",
        },
        {
          header: "Cantidad",
          key: "vendidos",
        },
      ],
      datos,
      res,
      "platos_mas_vendidos",
    );
  } catch (error) {
    next(error);
  }
};
export const comprasSemanalesExcel = async (req, res, next) => {
  try {
    const datos = await service.comprasSemanales();

    await generarExcel(
      "Compras Semanales",
      [
        {
          header: "Semana",
          key: "semana",
        },
        {
          header: "Total",
          key: "total",
        },
      ],
      datos,
      res,
      "compras_semanales",
    );
  } catch (error) {
    next(error);
  }
};
