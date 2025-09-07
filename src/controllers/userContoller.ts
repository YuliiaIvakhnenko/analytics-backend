import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-passwordHash");
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      passwordHash: hashed,
      fullName,
      role: role || "user",
    });

    await user.save();

    return res.status(201).json({
      message: "User created successfully",
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fullName, role, password } = req.body;

    const update: any = { fullName, role };

    if (password) {
      update.passwordHash = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(id, update, { new: true }).select("-passwordHash");

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({ message: "User updated", user });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({ message: "User deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};
