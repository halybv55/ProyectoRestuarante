import { getPedido, getPedidos } from "../api/pedido.api";

export function normalizeOrderState(value) {
  const normalized = String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();

  if (normalized === "EN PREPARACION" || normalized === "PREPARANDO") {
    return "PREPARANDO";
  }

  if (normalized === "PARCIALMENTE ENTREGADO") {
    return "PARCIAL";
  }

  return normalized;
}

export async function getOrderDetailsByState(states) {
  const requestedStates = new Set(states.map(normalizeOrderState));
  const pedidosResponse = await getPedidos();
  const pedidos = Array.isArray(pedidosResponse?.data)
    ? pedidosResponse.data
    : [];

  const detailsByOrder = await Promise.all(
    pedidos.map(async (pedido) => {
      const detailResponse = await getPedido(pedido.idpedido);
      const details = Array.isArray(detailResponse?.data)
        ? detailResponse.data
        : [];

      return details
        .filter(
          (detail) =>
            detail.plato &&
            requestedStates.has(normalizeOrderState(detail.estado)),
        )
        .map((detail) => ({
          ...detail,
          idpedido: pedido.idpedido,
          codigo_pedido: pedido.codigo_pedido,
          tipo_pedido: pedido.tipo_pedido,
          fecha_hora: pedido.fecha_hora,
          mesa: pedido.mesa,
          plato: detail.plato ?? detail.bebida,
          estado: normalizeOrderState(detail.estado),
        }));
    }),
  );

  return detailsByOrder
    .flat()
    .sort(
      (left, right) =>
        new Date(left.fecha_hora).getTime() -
        new Date(right.fecha_hora).getTime(),
    );
}
