import { Router } from "express";
import * as controller from "./detalleMenu.controller.js";

const router = Router();

router.post("/", controller.addPlatos);

router.get("/:idmenu", controller.getByMenu);

router.put("/:id/stock", controller.updateStock);

router.patch("/:id/desactivar", controller.remove);

export default router;
