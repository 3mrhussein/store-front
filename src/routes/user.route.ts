import express from 'express';
import { users_GET, users_POST, users_id_GET } from '../handlers/user.handler';
import uniqueUser_MW from '../middlewares/userMiddlewares/uniUser.middleware';
import uuid_MW from '../middlewares/userMiddlewares/uuid.middleware';
import validateUser_MW from '../middlewares/userMiddlewares/validateUser.middleware';

const userRoutes = express.Router();

userRoutes.get('/:id', uuid_MW, users_id_GET);

userRoutes.get('/', users_GET);

userRoutes.post('/', validateUser_MW, uniqueUser_MW, users_POST);

export default userRoutes;
