import type { Request, Response, NextFunction } from "express";
import { signinSchema } from "../schemas/zodSchemas.js";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const result = signinSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid credentials format." });
  }
  next();
}
