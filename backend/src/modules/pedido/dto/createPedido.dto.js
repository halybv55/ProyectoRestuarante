export const createPedidoDto = (body) => {
  return {
    tipoPedido: body.tipoPedido,
    idMesa: body.idMesa ?? null,
    idUsuario: body.idUsuario,
    observacion: body.observacion ?? null,

    platos: body.platos ?? [],
    combos: body.combos ?? [],
    bebidas: body.bebidas ?? [],
  };
};
