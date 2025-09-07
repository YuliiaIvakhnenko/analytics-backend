import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  setRefreshCookie,
  clearRefreshCookie,
} from "../utils/jwt";
import mongoose from "mongoose";

// ================= REGISTER =================
export const register = async (req: Request, res: Response) => {
  try {
    console.log("Incoming register body:", req.body);

    const { email, password, fullName, role } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ 
        message: "Email, password і fullName є обов'язковими" 
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      passwordHash: hashed,
      fullName,
      role: role && ["admin", "analyst", "manager", "client"].includes(role)
        ? role
        : "client", 
    });

    await user.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error", error: err });
  }
};


// ================= LOGIN =================
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const userId = (user._id as mongoose.Types.ObjectId).toString(); 
    const accessToken = signAccessToken({ sub: userId, role: user.role });
    const refreshToken = signRefreshToken({
      sub: userId,
      role: user.role,
      tokenVersion: user.tokenVersion,
    });

    setRefreshCookie(res, refreshToken);

    return res.json({
      accessToken,
      user: { id: userId, email: user.email, role: user.role },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};


// ================= REFRESH =================
export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const payload = verifyRefreshToken(token);
    const user = await User.findById(payload.sub);

    if (!user || user.tokenVersion !== payload.tokenVersion) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = (user._id as mongoose.Types.ObjectId).toString();
    const newAccess = signAccessToken({ sub: userId, role: user.role });
    const newRefresh = signRefreshToken({
      sub: userId,
      role: user.role,
      tokenVersion: user.tokenVersion,
    });

    setRefreshCookie(res, newRefresh);

    return res.json({ accessToken: newAccess });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};


// ================= LOGOUT =================
export const logout = async (req: Request, res: Response) => {
  try {
    clearRefreshCookie(res);
    return res.json({ message: "Logged out" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};
