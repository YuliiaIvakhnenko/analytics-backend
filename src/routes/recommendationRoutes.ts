import express from "express";
import { getRecommendations, createRecommendation, updateRecommendation, deleteRecommendation, getFilteredRecommendations } from "../controllers/recommendationContoller";

const router = express.Router();

router.get("/", getRecommendations);
router.post("/", createRecommendation);
router.put("/:id", updateRecommendation);
router.delete("/:id", deleteRecommendation);
router.get("/filtered", getFilteredRecommendations);

export default router;
