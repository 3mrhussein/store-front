import userRoutes from './user.route';
import express from 'express';

const routes = express.Router();

routes.use('/users', userRoutes);

export default routes;
