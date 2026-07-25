import * as service from "./pedido.service.js";
import { success } from "../../shared/responses/apiResponse.js";

export const create = async (req, res, next) => {
  try {
    const pedido = await service.create(req.body);

    return res
      .status(201)
      .json(success(pedido, "Pedido registrado correctamente."));
  } catch (error) {
    next(error);
  }
};
export const getAll = async (req, res, next) => {
  try {
    return res.json(success(await service.getAll()));
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    return res.json(success(await service.getById(req.params.id)));
  } catch (error) {
    next(error);
  }
};
export const getPendientes = async (req, res, next) => {
  try {
    return res.json(success(await service.getPendientes()));
  } catch (error) {
    next(error);
  }
};

export const updateEstadoDetalle = async (req, res, next) => {
  try {
    return res.json(
      success(
        await service.updateEstadoDetalle(req.params.id, req.body.idEstado),
        "Estado actualizado correctamente.",
      ),
    );
  } catch (error) {
    next(error);
  }
};

export const getListos = async (req, res, next) => {
  try {
    return res.json(success(await service.getListos()));
  } catch (error) {
    next(error);
  }
};
