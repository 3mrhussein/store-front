import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { encrypt } from '../utils';
import { user_GET } from '../handlers/user.handler';

const userRoutes = express.Router();

userRoutes.get('/', user_GET);

userRoutes.get('/compare', async (req: Request, res: Response) => {
  res.send(await bcrypt.compare(req.body.password, req.body.hashedPassword));
});

export default userRoutes;
