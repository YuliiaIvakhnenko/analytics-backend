import { Request, Response } from "express";
import { DepositInvestment } from "../models/DepositInvestment";

export const getDepositInvestments = async (req: Request, res: Response) => {
  try {
    const investments = await DepositInvestment.find().populate("depositProductId clientId");
    res.json(investments);
  } catch {
    res.status(500).json({ message: "Error fetching deposit investments" });
  }
};

export const createDepositInvestment = async (req: Request, res: Response) => {
  try {
    const investment = new DepositInvestment(req.body);
    await investment.save();
    res.status(201).json(investment);
  } catch {
    res.status(400).json({ message: "Error creating deposit investment" });
  }
};

export const updateDepositInvestment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedInvestment = await DepositInvestment.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedInvestment) return res.status(404).json({ message: "Deposit investment not found" });
    res.json(updatedInvestment);
  } catch {
    res.status(400).json({ message: "Error updating deposit investment" });
  }
};

export const deleteDepositInvestment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const investment = await DepositInvestment.findById(id);
    if (!investment) return res.status(404).json({ message: "Deposit investment not found" });

    await investment.deleteOne();
    res.json({ message: "Deposit investment deleted successfully" });
  } catch {
    res.status(400).json({ message: "Error deleting deposit investment" });
  }
};
