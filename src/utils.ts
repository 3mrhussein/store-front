import config from './config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { USER } from './interfaces/interfaces';

const { PEPPER, TOKEN_SECRET } = config;

export const hash = (password: string): string => {
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password + PEPPER, salt);
  //returning 60 char
  return hashedPassword;
};

export const verifyPassword = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password + PEPPER, hashedPassword);
};

export const createToken = (payload: USER): string => {
  return jwt.sign(payload, TOKEN_SECRET as string, { expiresIn: 1000 * 60 * 60 * 24 });
};

export const maxPassword = () => {
  return 72 - (PEPPER as string).length;
};
