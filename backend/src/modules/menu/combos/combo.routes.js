import { Router } from "express";
import * as controller from "./combo.controller.js";

const router = Router();

router.post("/", controller.create);

export default router;
