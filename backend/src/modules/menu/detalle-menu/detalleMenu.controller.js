import * as service from "./detalleMenu.service.js";
import { success } from "../../../shared/responses/apiResponse.js";

export const addPlatos = async (req, res, next) => {
  try {
    await service.addPlatos(req.body);

    return res
      .status(201)
      .json(success(null, "Platos agregados correctamente."));
  } catch (error) {
    next(error);
  }
};

export const getByMenu = async (req, res, next) => {
  try {
    return res.json(success(await service.getByMenu(req.params.idmenu)));
  } catch (error) {
    next(error);
  }
};

export const updateStock = async (req, res, next) => {
  try {
    return res.json(
      success(
        await service.updateStock(
          req.params.id,

          req.body.stock,
        ),

        "Stock actualizado.",
      ),
    );
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await service.remove(req.params.id);

    return res.json(
      success(
        null,

        "Plato desactivado.",
      ),
    );
  } catch (error) {
    next(error);
  }
};
