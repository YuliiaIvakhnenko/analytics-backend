import { Document, Types } from "mongoose";

export interface IRecommendationItem {
  type: "security" | "deposit";
  refId: Types.ObjectId;
  rationale?: string;
  score?: number;
}

export interface IRecommendation extends Document {
  createdBy: Types.ObjectId;
  createdAt: Date;
  clientId?: Types.ObjectId;
  clientDeleted: boolean;
  items: IRecommendationItem[];
  createdByDeleted: boolean;
}
