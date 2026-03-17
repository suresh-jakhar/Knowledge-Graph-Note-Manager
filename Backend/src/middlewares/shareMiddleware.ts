import type { Request, Response, NextFunction } from "express";
import { shareSchema } from "../schemas/zodSchemas.js";

export function shareMiddleware(req: Request, res: Response, next: NextFunction) {
  const result = shareSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid share request format." });
  }
  next();
}
