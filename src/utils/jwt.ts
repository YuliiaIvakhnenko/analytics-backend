import jwt from "jsonwebtoken";
import { Response } from "express";

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";

// ================= ACCESS TOKEN =================
export function signAccessToken(payload: object) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
}

// ================= REFRESH TOKEN =================
export function signRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

// ================= VERIFY REFRESH =================
export function verifyRefreshToken(token: string): any {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}

// ================= VERIFY ACCESS =================
export function verifyAccessToken(token: string): any {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

// ================= COOKIE HELPERS =================
export function setRefreshCookie(res: Response, token: string) {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 днів
  });
}

export function clearRefreshCookie(res: Response) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}
