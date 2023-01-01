import { authUser_MW } from '../middlewares/userMiddlewares/USER.MW';
import express from 'express';
import uuid_MW from '../middlewares/uuid.middleware';
import {
  completed_orders_GET,
  completed_orders_page_GET,
  current_order_GET,
  current_order_page_GET,
  orders_addItem_GET,
  orders_addItem_POST,
  orders_create_GET,
  orders_create_POST,
  orders_GET,
} from '../handlers/orders.handlers';

const ordersRoutes = express.Router();

ordersRoutes.get('/', orders_GET);
ordersRoutes.get('/create', orders_create_GET);
ordersRoutes.post('/create', orders_create_POST);
ordersRoutes.get('/addItem', orders_addItem_GET);
ordersRoutes.post('/addItem', orders_addItem_POST);
ordersRoutes.get('/current', authUser_MW, current_order_page_GET);
ordersRoutes.get('/current/:id', authUser_MW, uuid_MW, current_order_GET);
ordersRoutes.get('/completed/', authUser_MW, completed_orders_page_GET);
ordersRoutes.get('/completed/:id', authUser_MW, uuid_MW, completed_orders_GET);

export default ordersRoutes;
