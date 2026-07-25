import * as service from "./mesa.service.js";
import { success } from "../../shared/responses/apiResponse.js";

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
        success(await service.create(req.body), "Mesa creada correctamente."),
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
        "Mesa actualizada correctamente.",
      ),
    );
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await service.remove(req.params.id);

    return res.json(success(null, "Mesa eliminada correctamente."));
  } catch (error) {
    next(error);
  }
};
