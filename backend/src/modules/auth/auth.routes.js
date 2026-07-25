import { Router } from "express";

import * as controller from "./auth.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/accounts", controller.accounts);

router.post("/login", controller.login);

router.get("/profile", authenticate, controller.profile);

export default router;
