import { validationResult } from "express-validator";

export function inputErrorHandler(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ message: errors.array() })
  }
  next();
}