import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import { UserModel } from "../models/User";
import { sendResetEmail } from "../utils/mailer";
import { Types } from "mongoose";


// ------------------ TOKEN HELPER ------------------

const signToken = (id: string): string => {
  const secret = process.env.JWT_SECRET as string;   // TS-safe cast
  const expiresIn = (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"];

  return jwt.sign({ id }, secret, { expiresIn });
};


// ------------------ SIGNUP ------------------

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const exists = await UserModel.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await UserModel.create({ email, password, name });

   const token = signToken(String(user._id));


    return res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};


// ------------------ LOGIN ------------------

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
const token = signToken(String(user._id));


    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};


// ------------------ FORGOT PASSWORD ------------------

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email required" });

    const user = await UserModel.findOne({ email });

    // Always respond the same for privacy
    if (!user)
      return res.json({ message: "If account exists, reset email sent" });

    const resetToken = crypto.randomBytes(32).toString("hex");

    const expiry = new Date(
      Date.now() +
        Number(process.env.RESET_TOKEN_EXPIRES_MIN || 30) * 60 * 1000
    );

    user.resetToken = resetToken;
    user.resetTokenExpiry = expiry;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&id=${user._id}`;

    await sendResetEmail(user.email, resetLink);

    return res.json({ message: "If account exists, reset email sent" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};


// ------------------ RESET PASSWORD ------------------

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { id, token, newPassword } = req.body;

    if (!id || !token || !newPassword)
      return res.status(400).json({ message: "Missing data" });

    const user = await UserModel.findById(id);

    if (
      !user ||
      user.resetToken !== token ||
      !user.resetTokenExpiry ||
      user.resetTokenExpiry < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    return res.json({ message: "Password reset success" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
