import mongoose, { Schema } from "mongoose";
import { IPriceHistory } from "../interfaces/IPriceHistory";

const priceHistorySchema = new Schema<IPriceHistory>(
  {
    securityId: { type: Schema.Types.ObjectId, ref: "Security", required: true },
    date: { type: Date, required: true },
    quote: { type: Number, required: true },
    volume: Number
  },
  { timestamps: true }
);

priceHistorySchema.index({ securityId: 1, date: 1 }, { unique: true });

export const PriceHistory = mongoose.model<IPriceHistory>("PriceHistory", priceHistorySchema);
