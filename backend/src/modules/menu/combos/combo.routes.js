import { Router } from "express";
import * as controller from "./combo.controller.js";

const router = Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getDetalle);

router.post("/", controller.create);

export default router;
