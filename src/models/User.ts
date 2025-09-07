import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  fullName: string;
  role: { 
    type: String, 
    enum: ["admin", "analyst", "manager", "client"], 
    default: "client" 
  },
  tokenVersion: number;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["admin", "analyst", "manager", "client"], 
    default: "client" 
  },
  tokenVersion: { type: Number, default: 0 },
});


export const User = mongoose.model<IUser>("User", UserSchema);
