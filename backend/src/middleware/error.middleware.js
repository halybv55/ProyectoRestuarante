import { fail } from "../shared/responses/apiResponse.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.statusCode || 500;

  return res
    .status(status)
    .json(fail(err.message || "Error interno del servidor."));
};
