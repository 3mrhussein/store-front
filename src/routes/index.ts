import userRoutes from './users.routes';
import rootRoutes from './root.routes';
import express from 'express';
import productRoutes from './products.routes';
import ordersRoutes from './orders.routes';

const routes = express.Router();

routes.use('/', rootRoutes);
routes.use('/users', userRoutes);
routes.use('/products', productRoutes);
routes.use('/orders', ordersRoutes);

export default routes;
