import * as repository from "./categoria.repository.js";

export const getAll = async () => {
  return await repository.getAll();
};

export const getById = async (id) => {
  const categoria = await repository.getById(id);

  if (!categoria) {
    throw new Error("Categoría no encontrada.");
  }

  return categoria;
};

export const create = async (data) => {
  if (!data.nombre) {
    throw new Error("El nombre es obligatorio.");
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
