import express from "express";
import { getPriceHistory, createPriceHistory, updatePriceHistory, deletePriceHistory } from "../controllers/priceHistoryController";

const router = express.Router();

router.get("/", getPriceHistory);
router.post("/", createPriceHistory);
router.put("/:id", updatePriceHistory);
router.delete("/:id", deletePriceHistory);

export default router;
