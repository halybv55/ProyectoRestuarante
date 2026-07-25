import { Router } from "express";
import { query } from "../database/index.js";

const router = Router();

router.get("/health", async (req, res) => {
  try {
    const result = await query("SELECT NOW()");

    res.json({
      ok: true,
      servidor: "Funcionando",
      hora: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      mensaje: "No se pudo conectar a PostgreSQL",
    });
  }
});

export default router;
