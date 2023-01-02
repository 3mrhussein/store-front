import { Request, Response, NextFunction } from 'express';
import { createToken, hash, verifyPassword } from '../utils';
import Users from '../models/user.model';
import path from 'path';
import jwt from 'jsonwebtoken';
import { USER } from '../interfaces/interfaces';

//-----------------------------------------------------------------------
//-------------------- ALL Users ------------------------
//-----------------------------------------------------------------------

export const users_GET = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user = new Users();
  try {
    const result = await user.index();
    res.send(result);
  } catch (err) {
    next(err);
  }
};

//-----------------------------------------------------------------------
//-------------------- Search user Page ------------------------
//-----------------------------------------------------------------------

export const users_search_page_GET = async (req: Request, res: Response): Promise<void> => {
  res.sendFile(path.resolve('public', 'searchUsers.html'));
};

//-----------------------------------------------------------------------
//-------------------- User By ID ------------------------
//-----------------------------------------------------------------------

export const user_id_GET = async (
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

//-----------------------------------------------------------------------
//-------------------- SIGN IN ------------------------
//-----------------------------------------------------------------------

export const signin_GET = async (req: Request, res: Response): Promise<void> => {
  res.sendFile(path.resolve('public', 'signin.html'));
};

export const signin_POST = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userCredentials: USER = {
    firstName: req.body.firstName as string,
    lastName: req.body.lastName as string,
    password: req.body.password as string,
  };
  try {
    const user = new Users();
    const result = await user.showByName(userCredentials.firstName, userCredentials.lastName);
    if (result && verifyPassword(userCredentials.password, result.password)) {
      res.cookie('token', createToken(result), { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
      res.redirect(req.session.returnTo || '/');
    } else {
      next({ status: 400, message: 'Invalid user credentials' });
    }
  } catch (err) {
    next(err);
  }
};

//-----------------------------------------------------------------------
//-------------------- SIGN UP ------------------------
//-----------------------------------------------------------------------

export const signup_GET = async (req: Request, res: Response): Promise<void> => {
  res.sendFile(path.resolve('public', 'signup.html'));
};

export const signup_POST = async (
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
    res.cookie('token', createToken(result), { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.send(result);
  } catch (err) {
    next(err);
  }
};

//-----------------------------------------------------------------------
//-------------------- SIGN OUT ------------------------
//-----------------------------------------------------------------------

export const signout_GET = async (req: Request, res: Response): Promise<void> => {
  res.cookie('token', '', { maxAge: 1, httpOnly: true });
  res.redirect('/');
};

//-----------------------------------------------------------------------
//-------------------- Current User ------------------------
//-----------------------------------------------------------------------

export const currentUser_GET = (req: Request, res: Response) => {
  if (req.cookies.token) {
    const decoded = jwt.decode(req.cookies.token, { json: true });
    res.send(decoded);
  } else res.send(null);
};
