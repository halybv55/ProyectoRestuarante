import { Router } from "express";

import healthRoutes from "./health.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import categoriaRoutes from "../modules/menu/categorias/categoria.routes.js";
import platoRoutes from "../modules/menu/platos/plato.routes.js";
import comboRoutes from "../modules/menu/combos/combo.routes.js";
import menuRoutes from "../modules/menu/menu-dia/menu.routes.js";
import detalleMenuRoutes from "../modules/menu/detalle-menu/detalleMenu.routes.js";
import pedidoRoutes from "../modules/pedido/pedido.routes.js";
import bebidaRoutes from "../modules/menu/bebidas/bebida.routes.js";
import mesaRoutes from "../modules/mesa/mesa.routes.js";
import ventaRoutes from "../modules/venta/venta.routes.js";
import reporteRoutes from "../modules/reporte/reporte.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/menu/categorias", categoriaRoutes);
router.use("/menu/platos", platoRoutes);
router.use("/menu/combos", comboRoutes);
router.use("/menu", menuRoutes);
router.use("/menu/detalle", detalleMenuRoutes);
router.use("/pedidos", pedidoRoutes);
router.use("/bebidas", bebidaRoutes);
router.use("/mesas", mesaRoutes);
router.use("/ventas",ventaRoutes);
router.use("/reportes", reporteRoutes);

export default router;
