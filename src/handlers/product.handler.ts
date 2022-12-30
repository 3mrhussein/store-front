import { Request, Response, NextFunction } from 'express';
import Products, { PRODUCT } from '../models/products.model';
import path from 'path';
export const products_GET = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const product = new Products();
  try {
    const result = await product.index();
    res.send(result);
  } catch (err) {
    next(err);
  }
};

export const products_POST = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const product = new Products();
  const newProduct: PRODUCT = {
    name: req.body.name as string,
    price: req.body.price as number,
    category: req.body.category as string,
  };

  try {
    const result = await product.create(newProduct);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

export const product_id_GET = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id as string;
  const product = new Products();
  try {
    const result = await product.show(id);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

export const ProductPage_GET = (req: Request, res: Response): void => {
  res.sendFile(path.resolve('public', 'getProduct.html'));
};
