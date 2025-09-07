import mongoose, { Schema } from "mongoose";
import { IInvestment } from "../interfaces/IInvestment";

const investmentSchema = new Schema<IInvestment>(
  {
    securityId: { type: Schema.Types.ObjectId, ref: "Security", required: true },
    clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    buyDate: { type: Date, required: true },
    buyPrice: Number,
    buyQuote: Number,
    sellDate: Date,
    sellPrice: Number,
    quantity: { type: Number, required: true },
    notes: String,
    status: { type: String, enum: ["active","closed"], default: "active" },
    securityDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Investment = mongoose.model<IInvestment>("Investment", investmentSchema);
