import { NextFunction, Request, Response } from 'express';
import { Error } from '../interfaces/interfaces';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'Somthing went wrong';
  res.status(status).json({ message, status });
};

export default errorMiddleware;
