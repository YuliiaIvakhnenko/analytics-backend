import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  role: "admin" | "analyst" | "manager" | "client";
  fullName: string;   
  status: string;
  deleted: boolean;
  tokenVersion: number;    
  isActive: boolean;        
  comparePassword(candidate: string): Promise<boolean>; 
}
