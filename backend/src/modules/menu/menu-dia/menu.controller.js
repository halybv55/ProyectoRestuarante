import * as service from "./menu.service.js";
import { success } from "../../../shared/responses/apiResponse.js";

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

export const getActivo = async (req, res, next) => {
  try {
    return res.json(success(await service.getActivo()));
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    return res
      .status(201)
      .json(
        success(await service.create(req.body), "Menú creado correctamente."),
      );
  } catch (error) {
    next(error);
  }
};

export const cerrar = async (req, res, next) => {
  try {
    return res.json(
      success(
        await service.cerrar(req.params.id),
        "Menú cerrado correctamente.",
      ),
    );
  } catch (error) {
    next(error);
  }
};
