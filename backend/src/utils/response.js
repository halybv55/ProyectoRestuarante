/**
 * Respuesta exitosa (200)
 */
export const success = (
  res,
  data = null,
  message = "Operación realizada correctamente.",
) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

/**
 * Recurso creado (201)
 */
export const created = (
  res,
  data = null,
  message = "Registro creado correctamente.",
) => {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
};

/**
 * Solicitud incorrecta (400)
 */
export const badRequest = (res, message = "Solicitud inválida.") => {
  return res.status(400).json({
    success: false,
    message,
  });
};

/**
 * No autenticado (401)
 */
export const unauthorized = (res, message = "No autorizado.") => {
  return res.status(401).json({
    success: false,
    message,
  });
};

/**
 * Prohibido (403)
 */
export const forbidden = (res, message = "Acceso denegado.") => {
  return res.status(403).json({
    success: false,
    message,
  });
};

/**
 * No encontrado (404)
 */
export const notFound = (res, message = "Recurso no encontrado.") => {
  return res.status(404).json({
    success: false,
    message,
  });
};

/**
 * Error interno (500)
 */
export const serverError = (
  res,
  error,
  message = "Ocurrió un error interno.",
) => {
  console.error(error);

  return res.status(500).json({
    success: false,
    message,
  });
};
