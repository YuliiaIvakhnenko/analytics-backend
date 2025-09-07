import { Document } from "mongoose";

export interface IClient extends Document {
  code: string;
  name: string;
  ownershipType: "private" | "state" | "LLC" | "JSC" | "other";
  address?: string;
  phone?: string;
  contacts?: string[];
}
