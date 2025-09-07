import mongoose, { Schema } from "mongoose";
import { IRecommendation } from "../interfaces/IRecommendation";

const recommendationSchema = new Schema<IRecommendation>(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    clientId: { type: Schema.Types.ObjectId, ref: "Client" },
    clientDeleted: { type: Boolean, default: false },
    createdByDeleted: { type: Boolean, default: false },
    items: [
      {
        type: { type: String, enum: ["security", "deposit"], required: true },
        refId: { type: Schema.Types.ObjectId, required: true },
        rationale: String,
        score: Number
      }
    ]
  },
  { timestamps: true }
);

export const Recommendation = mongoose.model<IRecommendation>("Recommendation", recommendationSchema);
