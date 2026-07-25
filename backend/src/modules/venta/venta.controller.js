import * as service from "./venta.service.js";
import { success } from "../../shared/responses/apiResponse.js";

export const create = async (req, res, next) => {
  try {
    return res.status(201).json(
      success(
        await service.create(req.body),

        "Venta registrada correctamente.",
      ),
    );
  } catch (error) {
    next(error);
  }
};
