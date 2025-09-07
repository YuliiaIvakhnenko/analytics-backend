import express from "express";
import { getDepositInvestments, createDepositInvestment, updateDepositInvestment, deleteDepositInvestment } from "../controllers/depositInvestmentContoller";

const router = express.Router();

router.get("/", getDepositInvestments);
router.post("/", createDepositInvestment);
router.put("/:id", updateDepositInvestment);
router.delete("/:id", deleteDepositInvestment);

export default router;
