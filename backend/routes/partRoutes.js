import express from "express";
import {
  createPart,
  deletePart,
  getPart,
  getParts,
  updatePart,
  getPartsByType,
  comparePartPrices,
} from "../controllers/partController.js";

const router = express.Router();

router.get("/", getParts);
router.get("/type/:type", getPartsByType);
router.get("/compare/:partName", comparePartPrices);
router.get("/:id", getPart);
router.post("/", createPart);
router.put("/:id", updatePart);
router.delete("/:id", deletePart);

export default router;
