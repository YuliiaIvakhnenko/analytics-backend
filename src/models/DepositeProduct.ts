import mongoose, { Schema, CallbackError } from "mongoose"; 
import { IDepositProduct } from "../interfaces/IDepositProduct";
import { DepositInvestment } from "./DepositInvestment";

const depositProductSchema = new Schema<IDepositProduct>(
  {
    bankName: { type: String, required: true },
    productName: { type: String, required: true },
    currency: { type: String, required: true },
    minAmount: { type: Number, required: true },
    annualRate: { type: Number, required: true },
    termMonths: { type: Number, required: true },
    conditions: String
  },
  { timestamps: true }
);

depositProductSchema.pre("deleteOne", { document: true, query: false }, async function (next: (err?: CallbackError) => void) {
  try {
    const doc = this as mongoose.Document & IDepositProduct;

    await DepositInvestment.updateMany(
      { depositProductId: doc._id },
      { productDeleted: true, status: "closed" }
    );

    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

export const DepositProduct = mongoose.model<IDepositProduct>("DepositProduct", depositProductSchema);
