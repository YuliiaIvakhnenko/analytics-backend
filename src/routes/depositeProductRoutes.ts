import express from "express";
import { getDepositProducts, createDepositProduct, updateDepositProduct, deleteDepositProduct } from "../controllers/depositeProductContoller";

const router = express.Router();

router.get("/", getDepositProducts);
router.post("/", createDepositProduct);
router.put("/:id", updateDepositProduct);
router.delete("/:id", deleteDepositProduct);

export default router;
