import * as service from "./plato.service.js";

export const getAll = async (req, res, next) => {
  try {
    res.json(await service.getAll());
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    res.json(await service.getById(req.params.id));
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    res.status(201).json(await service.create(req.body));
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    res.json(await service.update(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await service.remove(req.params.id);

    res.json({
      success: true,
      message: "Plato eliminado.",
    });
  } catch (error) {
    next(error);
  }
};
