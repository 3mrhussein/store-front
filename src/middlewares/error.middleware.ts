import { NextFunction, Request, Response } from 'express';
import ERROR from '../interfaces/error.interface';

const errorMiddleware = (error: ERROR, _req: Request, res: Response, _next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'Somthing went wrong';
  res.status(status).json({ message, status });
};

export default errorMiddleware;
