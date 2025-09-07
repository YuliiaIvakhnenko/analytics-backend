import { Request, Response } from "express";
import { PriceHistory } from "../models/PriceHistory";

// GET всі записи історії цін
export const getPriceHistory = async (req: Request, res: Response) => {
  try {
    const history = await PriceHistory.find();
    res.json(history);
  } catch {
    res.status(500).json({ message: "Error fetching price history" });
  }
};

export const createPriceHistory = async (req: Request, res: Response) => {
  try {
    const record = new PriceHistory(req.body);
    await record.save();
    res.status(201).json(record);
  } catch {
    res.status(400).json({ message: "Error creating price history" });
  }
};

export const updatePriceHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedRecord = await PriceHistory.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedRecord) return res.status(404).json({ message: "Price history record not found" });
    res.json(updatedRecord);
  } catch {
    res.status(400).json({ message: "Error updating price history" });
  }
};

export const deletePriceHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedRecord = await PriceHistory.findByIdAndDelete(id);
    if (!deletedRecord) return res.status(404).json({ message: "Price history record not found" });
    res.json({ message: "Price history record deleted successfully" });
  } catch {
    res.status(400).json({ message: "Error deleting price history" });
  }
};
