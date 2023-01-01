import { authUser_MW } from '../middlewares/userMiddlewares/USER.MW';
import {
  currentUser_GET,
  users_GET,
  user_id_GET,
  users_search_page_GET,
} from '../handlers/users.handlers';
import express from 'express';
import uuid_MW from '../middlewares/uuid.middleware';

const userRoutes = express.Router();

userRoutes.get('/', authUser_MW, users_GET);
userRoutes.get('/current-user', authUser_MW, currentUser_GET);
userRoutes.get('/search', authUser_MW, users_search_page_GET);
userRoutes.get('/:id', authUser_MW, uuid_MW, user_id_GET);

export default userRoutes;
