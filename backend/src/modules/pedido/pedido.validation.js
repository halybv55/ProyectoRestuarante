import AppError from "../../shared/errors/AppError.js";

export const validateCreatePedido = (data) => {
  if (!data.tipoPedido) {
    throw new AppError("Debe indicar el tipo de pedido.");
  }

  if (data.tipoPedido !== "RESTAURANTE" && data.tipoPedido !== "LLEVAR") {
    throw new AppError("Tipo de pedido inválido.");
  }

  if (data.tipoPedido === "RESTAURANTE" && !data.idMesa) {
    throw new AppError("Debe seleccionar una mesa.");
  }

  if (!data.idUsuario) {
    throw new AppError("Debe indicar el usuario.");
  }

  if (!Array.isArray(data.productos) || data.productos.length === 0) {
    throw new AppError("Debe agregar al menos un producto.");
  }

  for (const producto of data.productos) {
    if (!producto.tipo) {
      throw new AppError("El tipo del producto es obligatorio.");
    }

    if (!producto.id) {
      throw new AppError("El id del producto es obligatorio.");
    }

    if (!producto.cantidad || producto.cantidad <= 0) {
      throw new AppError("Cantidad inválida.");
    }
  }
};
