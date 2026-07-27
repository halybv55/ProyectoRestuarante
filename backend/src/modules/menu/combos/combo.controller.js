import * as service from "./combo.service.js";

export const create = async (req, res, next) => {
  try {
    const combo = await service.create(req.body);

    return res.status(201).json(combo);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    return res.json(await service.getAll());
  } catch (error) {
    next(error);
  }
};

export const getDetalle = async (req, res, next) => {
  try {
    return res.json(await service.getDetalle(req.params.id));
  } catch (error) {
    next(error);
  }
};