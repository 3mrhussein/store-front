import { Request, Response, NextFunction } from 'express';
import Products from '../models/products.model';
import path from 'path';
import { PRODUCT } from '../interfaces/interfaces';

//-----------------------------------------------------------------------
//-------------------- ALL PRODUCTS ------------------------
//-----------------------------------------------------------------------

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

//-----------------------------------------------------------------------
//-------------------- Create New Product ------------------------
//-----------------------------------------------------------------------

export const product_create_GET = (req: Request, res: Response): void => {
  res.sendFile(path.resolve('public', 'createProduct.html'));
};

export const product_create_POST = async (
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

//-----------------------------------------------------------------------
//-------------------- Products Search Page ------------------------
//-----------------------------------------------------------------------

export const product_search_GET = (req: Request, res: Response): void => {
  res.sendFile(path.resolve('public', 'getProduct.html'));
};

//-----------------------------------------------------------------------
//-------------------- Product By Id ------------------------
//-----------------------------------------------------------------------

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

//-----------------------------------------------------------------------
//-------------------- Products By Category Page ------------------------
//-----------------------------------------------------------------------

export const product_category_page_GET = (req: Request, res: Response): void => {
  res.sendFile(path.resolve('public', 'searchCategory.html'));
};

//-----------------------------------------------------------------------
//-------------------- Products By Category ------------------------
//-----------------------------------------------------------------------

export const product_category_GET = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const category = req.params.category as string;
  const product = new Products();
  try {
    const result = await product.showByCategory(category);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

//-----------------------------------------------------------------------
//-------------------- TOP Products ------------------------
//-----------------------------------------------------------------------

export const product_top_GET = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const product = new Products();
  try {
    const result = await product.topProducts(5);
    res.send(result);
  } catch (err) {
    next(err);
  }
};
