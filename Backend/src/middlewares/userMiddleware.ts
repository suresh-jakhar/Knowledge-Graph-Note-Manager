import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../db.js";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export async function userMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided." });
  }
  const token = authHeader.split(" ")[1] ?? "";
  let decoded: any;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
  if (!decoded || typeof decoded !== "object" || !decoded.userId) {
    return res.status(401).json({ error: "Invalid token payload." });
  }
  const user = await UserModel.findById(decoded.userId);
  if (!user) {
    return res.status(401).json({ error: "User not found." });
  }
  req.userId = user._id.toString();
  next();
}
