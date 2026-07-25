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
