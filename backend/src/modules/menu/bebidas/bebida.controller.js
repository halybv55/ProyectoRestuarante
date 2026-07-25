import * as service from "./bebida.service.js";
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

export const create = async (req, res, next) => {
  try {
    return res
      .status(201)
      .json(
        success(await service.create(req.body), "Bebida creada correctamente."),
      );
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    return res.json(
      success(
        await service.update(req.params.id, req.body),
        "Bebida actualizada correctamente.",
      ),
    );
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await service.remove(req.params.id);

    return res.json(success(null, "Bebida eliminada correctamente."));
  } catch (error) {
    next(error);
  }
};
