import * as repository from "./mesa.repository.js";
import AppError from "../../shared/errors/AppError.js";

export const getAll = async () => {
  return await repository.getAll();
};

export const getById = async (id) => {
  const mesa = await repository.getById(id);

  if (!mesa) {
    throw new AppError("Mesa no encontrada.", 404);
  }

  return mesa;
};

export const create = async (data) => {
  return await repository.create(data);
};

export const update = async (id, data) => {
  await getById(id);

  return await repository.update(id, data);
};

export const remove = async (id) => {
  await getById(id);

  await repository.remove(id);
};
