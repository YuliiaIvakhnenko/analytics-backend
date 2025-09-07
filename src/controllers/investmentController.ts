import { Request, Response } from "express";
import { Investment } from "../models/Investment";
import mongoose from "mongoose";

export const getInvestments = async (req: Request, res: Response) => {
  try {
    const investments = await Investment.find()
      .populate("clientId")
      .populate("securityId");
    console.log("Investments fetched:", investments);

    res.json(investments);
  } catch (err) {
    console.log("Error fetching investments:", err);
    res.status(500).json({ 
      message: "Error fetching investments", 
      error: err instanceof Error ? err.message : err 
    });
  }
};


export const createInvestment = async (req: Request, res: Response) => {
  try {
    const { client, security, quote, purchaseDate, saleDate, quantity, notes } = req.body;

    const missingFields: string[] = [];
    if (!client) missingFields.push('client');
    if (!security) missingFields.push('security');
    if (!quote) missingFields.push('quote');
    if (!purchaseDate) missingFields.push('purchaseDate');
    if (!quantity) missingFields.push('quantity');

    if (missingFields.length > 0) {
      return res.status(400).json({ message: "Missing required fields", fields: missingFields });
    }

    if (!mongoose.Types.ObjectId.isValid(client)) {
      return res.status(400).json({ message: "Invalid client ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(security)) {
      return res.status(400).json({ message: "Invalid security ID" });
    }

    const investment = new Investment({
      clientId: client,
      securityId: security,
      buyQuote: Number(quote),
      buyDate: new Date(purchaseDate),
      sellDate: saleDate ? new Date(saleDate) : undefined,
      quantity: Number(quantity),
      notes: notes || undefined
    });

    await investment.save();
    res.status(201).json(investment);
  } catch (err) {
    console.log("Error creating investment:", err);
    res.status(400).json({
      message: "Error creating investment",
      error: err instanceof Error ? err.message : err
    });
  }
};

export const updateInvestment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedInvestment = await Investment.findByIdAndUpdate(id, req.body, { new: true })
      .populate("clientId")
      .populate("securityId");

    if (!updatedInvestment) return res.status(404).json({ message: "Investment not found" });
    res.json(updatedInvestment);
  } catch (err) {
    console.log("Error updating investment:", err);
    res.status(400).json({ message: "Error updating investment", error: err instanceof Error ? err.message : err });
  }
};

export const deleteInvestment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const investment = await Investment.findById(id);

    if (!investment) return res.status(404).json({ message: "Investment not found" });

    await investment.deleteOne();
    res.json({ message: "Investment deleted successfully" });
  } catch (err) {
    console.log("Error deleting investment:", err);
    res.status(400).json({ message: "Error deleting investment", error: err instanceof Error ? err.message : err });
  }
};
