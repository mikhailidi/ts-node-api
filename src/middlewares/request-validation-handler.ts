import { NextFunction, Request, Response } from 'express';
import { ExpressJoiError } from 'express-joi-validation';

export const requestValidationHandler = (
  err: any | ExpressJoiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err && err.error && err.error.isJoi) {
    const formattedErrors = err.error.details.map(error => {
      return {
        message: error.message
      }
    });

    res.status(400).json({
      type: err.type,
      errors: formattedErrors
    });
  } else {
    next(err);
  }
};
