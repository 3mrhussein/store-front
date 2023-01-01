import express from 'express';
import {
  signup_POST,
  signin_POST,
  signin_GET,
  signup_GET,
  signout_GET,
} from '../handlers/users.handlers';
import {
  authUser_MW,
  uniqueUser_MW,
  validateUserParams_MW,
} from '../middlewares/userMiddlewares/USER.MW';

const rootRoutes = express.Router();

// -------------- GET ------------
rootRoutes.get('/signin', authUser_MW, signin_GET);

rootRoutes.get('/signup', authUser_MW, signup_GET);

rootRoutes.get('/signout', signout_GET);

// ----------------- POST ------------

rootRoutes.post('/signin', validateUserParams_MW, signin_POST);

rootRoutes.post('/signup', validateUserParams_MW, uniqueUser_MW, signup_POST);

export default rootRoutes;
