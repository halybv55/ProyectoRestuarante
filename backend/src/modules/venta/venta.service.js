import * as repository from "./venta.repository.js";
import { getIO } from "../../socket.js";

export const create = async (data) => {
  const venta = await repository.create(data);

  const io = getIO();

  io.to("admin").emit("venta-realizada", venta);

  io.to("cajero").emit("venta-realizada", venta);

  return venta;
};
