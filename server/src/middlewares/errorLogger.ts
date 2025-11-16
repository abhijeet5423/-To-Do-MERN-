import { Request, Response, NextFunction } from "express";
import { LogModel } from "../models/Log";

export const errorLogger = async (err: any, req: Request, _res: Response, next: NextFunction) => {
  try {
    await LogModel.create({
      message: err.message || "Unknown error",
      stack: err.stack,
      route: req.originalUrl,
      method: req.method
    });
  } catch (e) {
    console.error("Failed to log error to DB", e);
  } finally {
    next(err);
  }
};
