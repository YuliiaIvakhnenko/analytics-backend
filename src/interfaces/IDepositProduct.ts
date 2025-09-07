import { Document } from "mongoose";

export interface IDepositProduct extends Document {
  bankName: string;
  productName: string;
  currency: string;
  minAmount: number;
  annualRate: number;
  termMonths: number;
  conditions?: string;
}
