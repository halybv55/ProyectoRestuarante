import { Router } from "express";
import * as controller from "./menu.controller.js";

const router = Router();

router.get("/", controller.getAll);

router.get("/activo", controller.getActivo);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.patch("/:id/cerrar", controller.cerrar);

export default router;
