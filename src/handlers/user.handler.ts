import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { encrypt } from '../utils';

export const user_GET = async (req: Request, res: Response) => {
  res.send(encrypt(req.body as string));
};
