import * as repository from "./bebida.repository.js";
import AppError from "../../../shared/errors/AppError.js";

export const getAll = async () => {
  return await repository.getAll();
};

export const getById = async (id) => {
  const bebida = await repository.getById(id);

  if (!bebida) {
    throw new AppError("Bebida no encontrada.", 404);
  }

  return bebida;
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
