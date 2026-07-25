import * as repository from "./pedido.repository.js";
import * as platoRepository from "../menu/platos/plato.repository.js";
import * as comboRepository from "../menu/combos/combo.repository.js";
import * as bebidaRepository from "../menu/bebidas/bebida.repository.js";
import AppError from "../../shared/errors/AppError.js";
import { getIO } from "../../socket.js";
export const create = async (data) => {
  let detalles = [];
  let total = 0;

  /*=========================
      PLATOS
    =========================*/

  if (data.platos) {
    for (const item of data.platos) {
      const plato = await platoRepository.getById(item.idPlato);

      if (!plato || !plato.activo) {
        throw new AppError("Plato no encontrado.", 404);
      }

      const subtotal = Number(plato.precio) * item.cantidad;

      total += subtotal;

      detalles.push({
        cantidad: item.cantidad,
        precioUnitario: Number(plato.precio),
        subtotal,

        observacion: item.observacion ?? null,

        idPlato: plato.idplato,
        idBebida: null,

        idEstadoPedido: 1,
      });
    }
  }

  /*=========================
      BEBIDAS
    =========================*/

  if (data.bebidas) {
    for (const item of data.bebidas) {
      const bebida = await bebidaRepository.getById(item.idBebida);

      if (!bebida || !bebida.activo) {
        throw new AppError("Bebida no encontrada.", 404);
      }

      const subtotal = Number(bebida.precio) * item.cantidad;

      total += subtotal;

      detalles.push({
        cantidad: item.cantidad,
        precioUnitario: Number(bebida.precio),
        subtotal,

        observacion: null,

        idPlato: null,
        idBebida: bebida.idbebida,

        idEstadoPedido: 1,
      });
    }
  }

  /*=========================
      COMBOS
    =========================*/

  if (data.combos) {
    for (const item of data.combos) {
      const combo = await comboRepository.getById(item.idCombo);

      if (!combo) {
        throw new AppError("Combo no encontrado.", 404);
      }

      const platos = await comboRepository.getDetalleCombo(item.idCombo);

      total += Number(combo.precio) * item.cantidad;

      for (const platoCombo of platos) {
        detalles.push({
          cantidad: platoCombo.cantidad * item.cantidad,

          precioUnitario: Number(platoCombo.precio),

          subtotal:
            Number(platoCombo.precio) * platoCombo.cantidad * item.cantidad,

          observacion: null,

          idPlato: platoCombo.idplato,

          idBebida: null,

          idEstadoPedido: 1,
        });
      }
    }
  }

  const pedido = {
    tipoPedido: data.tipoPedido,

    idMesa: data.idMesa ?? null,

    idUsuario: data.idUsuario,

    total,

    idEstado: 1,

    detalles,
  };

  const pedidoCreado = await repository.create(pedido);

  const io = getIO();

  io.to("cocina").emit("nuevo-pedido", pedidoCreado);
  io.to("cajero").emit("pedido-creado", pedidoCreado);

  return pedidoCreado;
};
export const getAll = async () => {
  return await repository.getAll();
};

export const getById = async (id) => {
  return await repository.getById(id);
};
export const getPendientes = async () => {
  return await repository.getPendientes();
};

export const updateEstadoDetalle = async (id, idEstado) => {
  const detalle = await repository.updateEstadoDetalle(id, idEstado);

  const io = getIO();

  io.to("cocina").emit("estado-cambiado", detalle);

  if (Number(idEstado) === 3) {
    io.to("mesero").emit("plato-listo", detalle);
  }

  return detalle;
};

export const getListos = async () => {
  return await repository.getListos();
};
