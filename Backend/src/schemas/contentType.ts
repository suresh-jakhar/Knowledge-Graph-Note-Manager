import type { Request, Response, NextFunction } from "express";

export const contentTypeCheck = (req: Request, res: Response, next: NextFunction) => {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    if (!req.is("application/json")) {
      return res.status(415).json({
        error: "Content-Type must be application/json"
      });
    }
  }
  next();
};