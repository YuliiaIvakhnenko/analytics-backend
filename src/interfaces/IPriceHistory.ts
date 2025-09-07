import { Document, Types } from "mongoose";

export interface IPriceHistory extends Document {
  securityId: Types.ObjectId;
  date: Date;
  quote: number;
  volume?: number;
}
