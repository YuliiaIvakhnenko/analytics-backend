import mongoose, { Schema, CallbackError } from "mongoose";
import { IClient } from "../interfaces/IClient";
import { Investment } from "./Investment";
import { DepositInvestment } from "./DepositInvestment";
import { Recommendation } from "./Recommendation";

const clientSchema = new Schema<IClient>(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    ownershipType: { type: String, enum: ["private","state","LLC","JSC","other"], required: true },
    address: String,
    phone: String,
    contacts: [String]
  },
  { timestamps: true }
);

clientSchema.pre("deleteOne", { document: true, query: false }, async function (next: (err?: CallbackError) => void) {
  try {
    const doc = this as mongoose.Document & IClient;

    await Investment.deleteMany({ clientId: doc._id });
    await DepositInvestment.deleteMany({ clientId: doc._id });
    await Recommendation.updateMany({ clientId: doc._id }, { clientDeleted: true });

    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

export const Client = mongoose.model<IClient>("Client", clientSchema);
