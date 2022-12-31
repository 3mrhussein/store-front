import express from 'express';
import {
  product_search_GET,
  products_GET,
  product_create_POST,
  product_id_GET,
  product_create_GET,
} from '../handlers/products.handler';
import uniqueProduct_MW from '../middlewares/productMiddlewares/uniqueProduct.middleware';
import authUser_MW from '../middlewares/userMiddlewares/authUser.middleware';
import uuid_MW from '../middlewares/uuid.middleware';

const productsRoutes = express.Router();

productsRoutes.get('/', products_GET);
productsRoutes.post('/create', authUser_MW, uniqueProduct_MW, product_create_POST);
productsRoutes.get('/create', authUser_MW, product_create_GET);
productsRoutes.get('/search', product_search_GET);
productsRoutes.get('/:id', uuid_MW, product_id_GET);

export default productsRoutes;
