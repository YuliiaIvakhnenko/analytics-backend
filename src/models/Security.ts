import mongoose, { Schema, CallbackError } from "mongoose"; 
import { ISecurity } from "../interfaces/ISecurity";
import { Investment } from "./Investment";

const securitySchema = new Schema<ISecurity>(
  {
    ticker: { type: String, required: true, unique: true },
    minDealAmount: { type: Number, required: true },
    rating: String,
    yieldLastYear: Number,
    extraInfo: String,
    type: { type: String, enum: ["bond","stock","ETF","other"], required: true },
    currency: { type: String, required: true }
  },
  { timestamps: true }
);

securitySchema.pre("deleteOne", { document: true, query: false }, async function (next: (err?: CallbackError) => void) {
  try {
    const doc = this as mongoose.Document & ISecurity;

    await Investment.updateMany(
      { securityId: doc._id },
      { securityDeleted: true, status: "closed" }
    );

    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

export const Security = mongoose.model<ISecurity>("Security", securitySchema);
