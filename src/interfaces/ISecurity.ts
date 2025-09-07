import { Document } from "mongoose";

export interface ISecurity extends Document {
  ticker: string;
  minDealAmount: number;
  rating?: string;
  yieldLastYear?: number;
  extraInfo?: string;
  type: "bond" | "stock" | "ETF" | "other";
  currency: string;
}
