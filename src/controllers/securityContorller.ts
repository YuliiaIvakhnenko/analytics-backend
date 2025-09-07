import { Request, Response } from "express";
import { Security } from "../models/Security";
import { v4 as uuidv4 } from "uuid";

export const getSecurities = async (req: Request, res: Response) => {
  try {
    const securities = await Security.find();
    res.json(securities);
  } catch (err) {
    console.log("Error fetching securities:", err);
    res.status(500).json({ message: "Error fetching securities" });
  }
};

export const createSecurity = async (req: Request, res: Response) => {
  try {
    const { code, minAmount, rating, lastYearYield, info, type, currency } = req.body;

    if (!code || !minAmount || !type || !currency) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const security = new Security({
      ticker: code,
      minDealAmount: minAmount,
      rating,
      yieldLastYear: lastYearYield,
      extraInfo: info,
      type,
      currency
    });

    await security.save();
    res.status(201).json(security);
  } catch (err) {
    console.log("Error creating security:", err);
    res.status(400).json({ message: "Error creating security" });
  }
};

export const updateSecurity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedSecurity = await Security.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSecurity) return res.status(404).json({ message: "Security not found" });
    res.json(updatedSecurity);
  } catch (err) {
    console.log("Error updating security:", err);
    res.status(400).json({ message: "Error updating security" });
  }
};

export const deleteSecurity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const security = await Security.findById(id);
    if (!security) return res.status(404).json({ message: "Security not found" });

    await security.deleteOne();
    res.json({ message: "Security deleted successfully" });
  } catch (err) {
    console.log("Error deleting security:", err);
    res.status(400).json({ message: "Error deleting security" });
  }
};

export const getSecurityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const security = await Security.findById(id);
    if (!security) {
      return res.status(404).json({ message: "Security not found" });
    }
    res.json(security);
  } catch (err) {
    console.log("Error fetching security:", err);
    res.status(400).json({ message: "Error fetching security" });
  }
};
