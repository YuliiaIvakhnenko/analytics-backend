import { Request, Response } from "express";
import { Recommendation } from "../models/Recommendation";

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const recs = await Recommendation.find().populate("createdBy clientId");
    res.json(recs);
  } catch {
    res.status(500).json({ message: "Error fetching recommendations" });
  }
};

export const createRecommendation = async (req: Request, res: Response) => {
  try {
    const rec = new Recommendation(req.body);
    await rec.save();
    res.status(201).json(rec);
  } catch {
    res.status(400).json({ message: "Error creating recommendation" });
  }
};

export const updateRecommendation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedRec = await Recommendation.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedRec) return res.status(404).json({ message: "Recommendation not found" });
    res.json(updatedRec);
  } catch {
    res.status(400).json({ message: "Error updating recommendation" });
  }
};

export const deleteRecommendation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rec = await Recommendation.findById(id);
    if (!rec) return res.status(404).json({ message: "Recommendation not found" });
    await rec.deleteOne();
    res.json({ message: "Recommendation deleted successfully" });
  } catch {
    res.status(400).json({ message: "Error deleting recommendation" });
  }
};

export const getFilteredRecommendations = async (req: Request, res: Response) => {
  try {
    const minScore = Number(req.query.minScore) || 0;
    const maxScore = Number(req.query.maxScore) || 100;
    const type = req.query.type as "security" | "deposit" | undefined;
    const clientId = req.query.clientId as string | undefined;
    const createdBy = req.query.createdBy as string | undefined;

    const filter: any = {
      "items.score": { $gte: minScore, $lte: maxScore }
    };

    if (type) filter["items.type"] = type;
    if (clientId) filter.clientId = clientId;
    if (createdBy) filter.createdBy = createdBy;

    const recommendations = await Recommendation.find(filter).populate("createdBy clientId");
    res.json(recommendations);
  } catch (err) {
    console.error("Error fetching filtered recommendations:", err);
    res.status(500).json({
      message: "Error fetching filtered recommendations",
      error: err instanceof Error ? err.message : err
    });
  }
};
