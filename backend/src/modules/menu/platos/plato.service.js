import * as repository from "./plato.repository.js";

export const getAll = async () => {
  return await repository.getAll();
};

export const getById = async (id) => {
  const plato = await repository.getById(id);

  if (!plato) {
    throw new Error("Plato no encontrado.");
  }

  return plato;
};

export const create = async (data) => {
  if (!data.nombre) {
    throw new Error("Debe ingresar el nombre.");
  }

  if (!data.precio) {
    throw new Error("Debe ingresar el precio.");
  }

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
