import { Router } from "express";
import * as controller from "./reporte.controller.js";

const router = Router();

router.get("/ventas-diarias", controller.ventasDiarias);

router.get("/ventas-semanales", controller.ventasSemanales);

router.get("/ganancia-semanal", controller.gananciaSemanal);

router.get("/platos-mas-vendidos", controller.platosMasVendidos);

router.get("/compras-semanales", controller.comprasSemanales);
router.get("/ventas-diarias/excel", controller.ventasDiariasExcel);

router.get("/ventas-semanales/excel", controller.ventasSemanalesExcel);

router.get("/ganancia-semanal/excel", controller.gananciaSemanalExcel);

router.get("/platos-mas-vendidos/excel", controller.platosMasVendidosExcel);

router.get("/compras-semanales/excel", controller.comprasSemanalesExcel);

export default router;
