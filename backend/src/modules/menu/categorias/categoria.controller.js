import * as service from "./categoria.service.js";

export const getAll = async (req, res, next) => {
  try {
    const categorias = await service.getAll();

    return res.json(categorias);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const categoria = await service.getById(req.params.id);

    return res.json(categoria);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const categoria = await service.create(req.body);

    return res.status(201).json(categoria);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const categoria = await service.update(req.params.id, req.body);

    return res.json(categoria);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await service.remove(req.params.id);

    return res.json({
      success: true,
      message: "Categoría eliminada correctamente.",
    });
  } catch (error) {
    next(error);
  }
};
