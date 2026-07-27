import * as repository from "./combo.repository.js";

export const create = async (data) => {
  if (!data.nombre) {
    throw new Error("Debe ingresar el nombre.");
  }

  if (!data.precio) {
    throw new Error("Debe ingresar el precio.");
  }

  if (!data.platos || data.platos.length === 0) {
    throw new Error("Debe agregar al menos un plato.");
  }

  return await repository.create(data);
};
export const getAll = async () => {
  return await repository.getAll();
};

export const getDetalle = async (id) => {
  const combo = await repository.getDetalle(id);

  if (!combo) {
    throw new Error("Combo no encontrado.");
  }

  return combo;
};
