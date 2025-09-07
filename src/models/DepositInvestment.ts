import mongoose, { Schema } from "mongoose";
import { IDepositInvestment } from "../interfaces/IDepositInvestment";

const depositInvestmentSchema = new Schema<IDepositInvestment>(
  {
    depositProductId: { type: Schema.Types.ObjectId, ref: "DepositProduct", required: true },
    clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    expectedInterest: { type: Number, required: true },
    actualInterest: Number,
    notes: String,
    status: { type: String, enum: ["active","closed"], default: "active" },
    productDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const DepositInvestment = mongoose.model<IDepositInvestment>("DepositInvestment", depositInvestmentSchema);
