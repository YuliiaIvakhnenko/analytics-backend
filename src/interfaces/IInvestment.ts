import { Document, Types } from "mongoose";

export interface IInvestment extends Document {
  securityId: Types.ObjectId;
  clientId: Types.ObjectId;
  buyDate: Date;
  buyPrice?: number;
  buyQuote?: number;
  sellDate?: Date;
  sellPrice?: number;
  quantity: number;
  notes?: string;
  status: string;
  securityDeleted: boolean;
}
