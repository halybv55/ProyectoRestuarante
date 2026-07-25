import * as repository from "./detalleMenu.repository.js";

import * as platoRepository from "../platos/plato.repository.js";
import * as menuRepository from "../menu-dia/menu.repository.js";

import AppError from "../../../shared/errors/AppError.js";

export const addPlatos = async (data) => {
  const menu = await menuRepository.getById(data.idmenu);

  if (!menu) {
    throw new AppError("El menú no existe.", 404);
  }

  for (const plato of data.platos) {
    const existe = await platoRepository.getById(plato.idplato);

    if (!existe) {
      throw new AppError(`El plato ${plato.idplato} no existe.`, 404);
    }
  }

  await repository.addPlatos(data.idmenu, data.platos);
};

export const getByMenu = async (idmenu) => {
  return await repository.getByMenu(idmenu);
};

export const updateStock = async (iddetalle, stock) => {
  return await repository.updateStock(iddetalle, stock);
};

export const remove = async (iddetalle) => {
  await repository.remove(iddetalle);
};
