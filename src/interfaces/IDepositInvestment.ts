import { Types } from "mongoose";

export interface IDepositInvestment {
  depositProductId: Types.ObjectId;
  clientId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  amount: number;
  expectedInterest: number;
  actualInterest?: number;
  notes?: string;
  status: string;
  productDeleted: boolean;
}
