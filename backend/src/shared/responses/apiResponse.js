export const success = (
  data = null,
  message = "Operación realizada correctamente.",
) => {
  return {
    success: true,
    message,
    data,
  };
};

export const fail = (message = "Ocurrió un error.") => {
  return {
    success: false,
    message,
  };
};
