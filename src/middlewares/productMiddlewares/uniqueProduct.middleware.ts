import { NextFunction, Request, Response } from 'express';
import { PRODUCT } from '../../interfaces/interfaces';
import Products from '../../models/products.model';

const uniqueProduct_MW = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //check if user is unique base on firstName & lastName maybe handeled to check for only email later
  const newProduct: PRODUCT = {
    name: req.body.name as string,
    price: req.body.price as number,
    category: req.body.category as string,
  };

  const product = new Products();
  try {
    const userExist = await product.showByName(newProduct.name);
    if (userExist) {
      next({ status: 404, message: 'Product already exists' });
    } else next();
  } catch (err) {
    next(err);
  }
};

export default uniqueProduct_MW;
