import express from 'express';
import {
  ProductPage_GET,
  products_GET,
  products_POST,
  product_id_GET,
} from '../handlers/product.handler';
import uniqueProduct_MW from '../middlewares/productMiddlewares/uniqueProduct.middleware';
import authUser_MW from '../middlewares/userMiddlewares/authUser.middleware';
import uuid_MW from '../middlewares/uuid.middleware';

const productRoutes = express.Router();

productRoutes.get('/', authUser_MW, products_GET);
productRoutes.post('/', uniqueProduct_MW, products_POST);
productRoutes.get('/get-by-id', ProductPage_GET);
productRoutes.get('/:id', uuid_MW, product_id_GET);

export default productRoutes;
