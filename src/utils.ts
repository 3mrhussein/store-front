import config from './config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { USER } from './models/user.model';
import { ORDER, ORDER_PRODUCT } from './models/orders.model';
import { PRODUCT } from './models/products.model';
const { PEPPER, TOKEN_SECRET } = config;

export const hash = (password: string): string => {
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password + PEPPER, salt);
  //returning 60 char
  return hashedPassword;
};

export const verifyPassword = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password + PEPPER, hashedPassword);
};

export const createToken = (payload: USER): string => {
  return jwt.sign(payload, TOKEN_SECRET as string, { expiresIn: 1000 * 60 * 60 * 24 });
};

export const maxPassword = () => {
  return 72 - (PEPPER as string).length;
};

export interface Item {
  product: PRODUCT;
  qty: number;
}

export interface ORGANIZED_ORDER {
  orderID: string;
  userID: string;
  status: string;
  productList: Item[];
}

export const organizeOrders = (data: (ORDER_PRODUCT & ORDER & PRODUCT)[]): ORGANIZED_ORDER[] => {
  let currentOrder = data[0].order_id;

  const itemList: ORGANIZED_ORDER[] = [];

  const item: ORGANIZED_ORDER = {
    orderID: '',
    userID: '',
    status: '',
    productList: [],
  };
  data.forEach((row) => {
    if (row.order_id == currentOrder) {
      item.orderID = row.order_id;
      item.userID = row.user_id;
      item.status = row.status;
      item.productList.push(getItem(row));
    } else {
      itemList.push({ ...item });
      currentOrder = row.order_id;
      item.orderID = row.order_id;
      item.userID = row.user_id;
      item.status = row.status;
      item.productList = [];
      item.productList.push(getItem(row));
    }
  });
  itemList.push({ ...item });
  return itemList;
};
function getItem(row: ORDER & ORDER_PRODUCT & PRODUCT): Item {
  const newItem: Item = {
    product: getProduct(row),
    qty: row.qty,
  };
  return newItem;
}

function getProduct(row: ORDER & ORDER_PRODUCT & PRODUCT): PRODUCT {
  const newProduct: PRODUCT = {
    id: row.product_id,
    name: row.name,
    price: row.price,
    category: row.category,
  };
  return newProduct;
}
