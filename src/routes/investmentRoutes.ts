import express from "express";
import {
  createInvestment,
  getInvestments,
  updateInvestment,
  deleteInvestment
} from "../controllers/investmentController";

const router = express.Router();

router.get("/", getInvestments);
router.post("/", createInvestment);
router.put("/:id", updateInvestment);
router.delete("/:id", deleteInvestment);

export default router;
