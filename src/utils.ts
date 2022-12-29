import config from './config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { USER } from './models/users';
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

export const verifyToken = (token: string) => {
  jwt.verify(token, TOKEN_SECRET as string, function (err, decoded) {
    if (err) {
      return false;
    }
    if (decoded) {
      return decoded;
    }
  });
};

export const maxPassword = () => {
  return 72 - (PEPPER as string).length;
};
