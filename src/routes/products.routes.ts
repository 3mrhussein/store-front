import express from 'express';
import uniqueProduct_MW from '../middlewares/productMiddlewares/uniqueProduct.middleware';
import authUser_MW from '../middlewares/userMiddlewares/authUser.middleware';
import uuid_MW from '../middlewares/uuid.middleware';
import {
  product_search_GET,
  products_GET,
  product_create_POST,
  product_id_GET,
  product_create_GET,
  product_top_GET,
  product_category_page_GET,
  product_category_GET,
} from '../handlers/products.handlers';

const productsRoutes = express.Router();

productsRoutes.get('/', products_GET);
productsRoutes.get('/top', product_top_GET);
productsRoutes.post('/create', authUser_MW, uniqueProduct_MW, product_create_POST);
productsRoutes.get('/create', authUser_MW, product_create_GET);
productsRoutes.get('/search', product_search_GET);
productsRoutes.get('/category', product_category_page_GET);
productsRoutes.get('/category/:category', product_category_GET);
productsRoutes.get('/:id', uuid_MW, product_id_GET);

export default productsRoutes;
