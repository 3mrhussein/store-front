import config from './config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { PEPPER, TOKEN_SECRET } = config;

export const encrypt = (password: string): string => {
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password + PEPPER, salt);
  return hashedPassword;
};

export const createToken = (payload: string): string => {
  return jwt.sign(payload, TOKEN_SECRET as string);
};
