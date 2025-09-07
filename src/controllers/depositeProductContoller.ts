import { Request, Response } from "express";
import { DepositProduct } from "../models/DepositeProduct";


export const getDepositProducts = async (req: Request, res: Response) => {
  try {
    const products = await DepositProduct.find();
    res.json(products);
  } catch {
    res.status(500).json({ message: "Error fetching deposit products" });
  }
};

export const createDepositProduct = async (req: Request, res: Response) => {
  try {
    const product = new DepositProduct(req.body);
    await product.save();
    res.status(201).json(product);
  } catch {
    res.status(400).json({ message: "Error creating deposit product" });
  }
};

export const updateDepositProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProduct = await DepositProduct.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Deposit product not found" });
    res.json(updatedProduct);
  } catch {
    res.status(400).json({ message: "Error updating deposit product" });
  }
};

export const deleteDepositProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await DepositProduct.findById(id);
    if (!product) return res.status(404).json({ message: "Deposit product not found" });

    await product.deleteOne(); 
    res.json({ message: "Deposit product deleted successfully" });
  } catch {
    res.status(400).json({ message: "Error deleting deposit product" });
  }
};
