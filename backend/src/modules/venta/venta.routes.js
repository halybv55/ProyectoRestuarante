import { Router } from "express";
import * as controller from "./venta.controller.js";

const router = Router();

router.post("/", controller.create);

export default router;
