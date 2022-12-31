import { Request, Response, NextFunction } from 'express';
import Orders, { ORDER, ORDER_PRODUCT } from '../models/orders.model';
import path from 'path';
import { organizeOrders } from '../utils';

// -----------------------
// -----------------
// ----------
// ----------------------- GET ALL orders
// ----------
// -----------------
// -----------------------

export const orders_GET = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const order = new Orders();
  try {
    const result = await order.index();
    // res.send(result);
    const data = organizeOrders(result);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

// -----------------------
// -----------------
// ----------
// ----------------------- GET Current order for USER
// ----------
// -----------------
// -----------------------

export const current_order_GET = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId: ORDER['id'] = req.params.id as string;
  const order = new Orders();
  try {
    const result = await order.currentOrder(userId);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

// -----------------------
// -----------------
// ----------
// ----------------------- GET Completed orders for USER
// ----------
// -----------------
// -----------------------

export const completed_order_GET = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId: ORDER['id'] = req.params.id as string;
  const order = new Orders();
  try {
    const result = await order.compeletedOrders(userId);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

// -----------------------
// -----------------
// ----------
// ----------------------- CREATE NEW ORDER
// ----------
// -----------------
// -----------------------

export const orders_create_POST = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const order = new Orders();
  const newOrder: ORDER = {
    user_id: req.body.user_id,
    status: req.body.status,
  };

  try {
    console.log(newOrder);
    const result = await order.create(newOrder);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

export const orders_create_GET = (req: Request, res: Response): void => {
  res.sendFile(path.resolve('public', 'createOrder.html'));
};

// -----------------------
// -----------------
// ----------
// ----------------------- ORDER ADD Item
// ----------
// -----------------
// -----------------------

export const orders_addItem_GET = (req: Request, res: Response): void => {
  res.sendFile(path.resolve('public', 'fillOrder.html'));
};

export const orders_addItem_POST = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const order = new Orders();
  const item: ORDER_PRODUCT = {
    order_id: req.body.order_id,
    product_id: req.body.product_id,
    qty: req.body.qty,
  };

  try {
    const result = await order.insertProduct(item);
    res.send(result);
  } catch (err) {
    next(err);
  }
};
