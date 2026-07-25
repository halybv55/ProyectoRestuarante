import { Router } from "express";
import * as controller from "./pedido.controller.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/cocina/pendientes", controller.getPendientes);

router.get("/cocina/listos", controller.getListos);

router.get("/:id", controller.getById);

router.post("/", controller.create);
router.put("/detalle/:id/estado", controller.updateEstadoDetalle);

export default router;
