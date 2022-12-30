import { authUser_MW } from '../middlewares/userMiddlewares/USER.MW';
import { currentUser_GET, users_GET, user_id_GET } from '../handlers/users.handler';
import express, { Request, Response } from 'express';
import uuid_MW from '../middlewares/uuid.middleware';

const userRoutes = express.Router();

userRoutes.get('/current-user', currentUser_GET);

userRoutes.get('/', users_GET);

userRoutes.get('/:id', uuid_MW, user_id_GET);

export default userRoutes;
