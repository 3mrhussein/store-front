import { authUser_MW } from '../middlewares/userMiddlewares/USER.MW';
import express, { Request, Response } from 'express';
import uuid_MW from '../middlewares/uuid.middleware';
import {
  completed_order_GET,
  current_order_GET,
  orders_addItem_GET,
  orders_addItem_POST,
  orders_create_GET,
  orders_create_POST,
  orders_GET,
} from '../handlers/orders.handler';

const ordersRoutes = express.Router();
ordersRoutes.get('/', orders_GET);
ordersRoutes.get('/create', orders_create_GET);
ordersRoutes.post('/create', orders_create_POST);
ordersRoutes.get('/addItem', orders_addItem_GET);
ordersRoutes.post('/addItem', orders_addItem_POST);
ordersRoutes.get('/current/:id', uuid_MW, current_order_GET);
ordersRoutes.get('/completed/:id', uuid_MW, completed_order_GET);

export default ordersRoutes;
