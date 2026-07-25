import * as repository from "./menu.repository.js";
import AppError from "../../../shared/errors/AppError.js";

export const getAll = async () => {
  return await repository.getAll();
};

export const getById = async (id) => {
  const menu = await repository.getById(id);

  if (!menu) {
    throw new AppError("Menú no encontrado.", 404);
  }

  return menu;
};

export const getActivo = async () => {
  return await repository.getActivo();
};

export const create = async (data) => {
  if (!data.fecha) {
    throw new AppError("Debe ingresar la fecha.");
  }

  const menuActivo = await repository.getActivo();

  if (menuActivo) {
    throw new AppError("Ya existe un menú activo.");
  }

  return await repository.create(data.fecha);
};

export const cerrar = async (id) => {
  await getById(id);

  return await repository.cerrar(id);
};
