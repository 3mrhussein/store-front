import { Request, Response, NextFunction } from 'express';
import Orders from '../models/orders.model';
import path from 'path';
import {
  ORDER,
  ORDER_ITEM,
  ORDER_PRODUCT,
  ORGANIZED_ORDER,
  PRODUCT,
} from '../interfaces/interfaces';

//-----------------------------------------------------------------------
//-------------------- ALL ORDERS ------------------------
//-----------------------------------------------------------------------

export const orders_GET = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const order = new Orders();
  try {
    const result = await order.index();
    const data = organizeOrders(result);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

//-----------------------------------------------------------------------
//-------------------- Current Page ------------------------
//-----------------------------------------------------------------------

export const current_order_page_GET = async (req: Request, res: Response): Promise<void> => {
  res.sendFile(path.resolve('public', 'searchCurrentOrder.html'));
};

//-----------------------------------------------------------------------
//-------------------- Current Order ------------------------
//-----------------------------------------------------------------------

export const current_order_GET = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.params.id as string;
  const order = new Orders();
  try {
    const result = await order.currentOrder(userId);
    const data = organizeOrders(result);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

//-----------------------------------------------------------------------
//-------------------- Current Page ------------------------
//-----------------------------------------------------------------------

export const completed_orders_page_GET = async (req: Request, res: Response): Promise<void> => {
  res.sendFile(path.resolve('public', 'searchCompletedOrder.html'));
};

//-----------------------------------------------------------------------
//-------------------- Completed Orders ------------------------
//-----------------------------------------------------------------------

export const completed_orders_GET = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.params.id as string;
  const order = new Orders();
  try {
    const result = await order.compeletedOrders(userId);
    const data = organizeOrders(result);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

//-----------------------------------------------------------------------
//-------------------- CREATE NEW ORDER ------------------------
//-----------------------------------------------------------------------

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
    //if the added order is active then mark all last user active order as completed
    if (newOrder.status === 'active') await order.setUserOrdersAsComplete(req.body.user_id);
    const result = await order.create(newOrder);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

export const orders_create_GET = (req: Request, res: Response): void => {
  res.sendFile(path.resolve('public', 'createOrder.html'));
};

//-----------------------------------------------------------------------
//-------------------- ORDER ADD ITEM ------------------------
//-----------------------------------------------------------------------
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

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
//-------------------- Data Orangization Section ------------------------
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

const organizeOrders = (data: (ORDER_PRODUCT & ORDER & PRODUCT)[]): ORGANIZED_ORDER[] => {
  let currentOrder = data[0].id;
  const itemList: ORGANIZED_ORDER[] = [];
  const item: ORGANIZED_ORDER = {
    orderID: '',
    userID: '',
    status: '',
    productList: [],
  };

  data.forEach((row) => {
    if (currentOrder !== row.id) {
      itemList.push({ ...item });
      currentOrder = row.id;
      item.productList = [];
    }
    item.orderID = row.id as string;
    item.userID = row.user_id;
    item.status = row.status;
    const newItem = getOrderItem(row);
    newItem && item.productList.push(newItem);
  });
  itemList.push({ ...item });
  return itemList;
};

const getOrderItem = (row: ORDER & ORDER_PRODUCT & PRODUCT): ORDER_ITEM | null => {
  return row.qty
    ? {
        qty: row.qty,
        product: {
          id: row.product_id,
          name: row.name,
          price: row.price,
          category: row.category,
        },
      }
    : null;
};
