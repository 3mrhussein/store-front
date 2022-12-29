import { Request, Response, NextFunction } from 'express';
import { createToken, hash } from '../utils';
import { USER, Users } from '../models/users';

export const users_GET = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user = new Users();
  try {
    const result = await user.index();
    res.send(result);
  } catch (err) {
    next(err);
  }
};

export const users_POST = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const newUser: USER = {
    firstName: req.body.firstName as string,
    lastName: req.body.lastName as string,
    password: hash(req.body.password as string),
  };

  try {
    const user = new Users();
    const result = await user.create(newUser);
    res.cookie('token', createToken(result), { maxAge: 1000 * 60 * 60 * 24 });
    res.send(result);
  } catch (err) {
    next(err);
  }
};

export const users_id_GET = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id as string;
  const user = new Users();
  try {
    const result = await user.show(id);
    res.send(result);
  } catch (err) {
    next(err);
  }
};
