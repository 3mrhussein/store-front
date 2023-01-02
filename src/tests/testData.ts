// import { MythicalWeaponStore, Weapon } from '../mythical_weapons';

import { PRODUCT, USER } from '../interfaces/interfaces';
import Orders from '../models/orders.model';
import Products from '../models/products.model';
import Users from '../models/user.model';
import { hash } from '../utils';

export const userDummyData: USER[] = [
  { firstName: 'user', lastName: 'user', password: hash('password') },
  { firstName: 'user2', lastName: 'user', password: hash('password') },
  { firstName: 'user3', lastName: 'user', password: hash('password') },
  { firstName: 'user4', lastName: 'user', password: hash('password') },
  { firstName: 'user5', lastName: 'user', password: hash('password') },
];

export const productDummyData: PRODUCT[] = [
  { name: 'product1', price: 50, category: 'category1' },
  { name: 'product2', price: 50, category: 'category1' },
  { name: 'product3', price: 50, category: 'category1' },
  { name: 'product5', price: 50, category: 'category2' },
  { name: 'product6', price: 50, category: 'category2' },
  { name: 'product7', price: 50, category: 'category2' },
  { name: 'product4', price: 50, category: 'category2' },
  { name: 'product8', price: 50, category: 'category3' },
  { name: 'product9', price: 50, category: 'category3' },
  { name: 'product10', price: 50, category: 'category4' },
];
export interface OrderData {
  user: number;
  status: 'active' | 'complete';
}
export const ordersDummyData: OrderData[] = [
  { user: 0, status: 'active' },
  { user: 0, status: 'complete' },
  { user: 0, status: 'complete' },
  { user: 0, status: 'complete' },
  { user: 1, status: 'active' },
  { user: 1, status: 'complete' },
  { user: 1, status: 'complete' },
  { user: 2, status: 'complete' },
  { user: 2, status: 'complete' },
  { user: 2, status: 'complete' },
  { user: 3, status: 'complete' },
  { user: 3, status: 'complete' },
  { user: 3, status: 'complete' },
  { user: 3, status: 'active' },
];

export interface OrderProductData {
  order_id: number;
  product_id: number;
  qty: number;
}
export const orderProductDummyData = [
  { order_id: 0, product_id: 0, qty: 5 },
  { order_id: 0, product_id: 1, qty: 5 },
  { order_id: 0, product_id: 2, qty: 2 },
  { order_id: 0, product_id: 3, qty: 6 },
  { order_id: 1, product_id: 0, qty: 7 },
  { order_id: 1, product_id: 1, qty: 8 },
  { order_id: 1, product_id: 2, qty: 9 },
  { order_id: 1, product_id: 3, qty: 10 },
  { order_id: 1, product_id: 4, qty: 11 },
  { order_id: 2, product_id: 0, qty: 10 },
  { order_id: 2, product_id: 2, qty: 10 },
  { order_id: 2, product_id: 1, qty: 10 },
  { order_id: 2, product_id: 3, qty: 10 },
  { order_id: 2, product_id: 4, qty: 12 },
  { order_id: 2, product_id: 5, qty: 17 },
  { order_id: 2, product_id: 6, qty: 18 },
  { order_id: 2, product_id: 7, qty: 20 },
  { order_id: 2, product_id: 8, qty: 26 },
  { order_id: 2, product_id: 9, qty: 30 },
  { order_id: 3, product_id: 2, qty: 50 },
  { order_id: 3, product_id: 3, qty: 1 },
  { order_id: 3, product_id: 4, qty: 2 },
  { order_id: 3, product_id: 5, qty: 3 },
  { order_id: 3, product_id: 6, qty: 4 },
  { order_id: 4, product_id: 0, qty: 5 },
  { order_id: 5, product_id: 4, qty: 6 },
  { order_id: 5, product_id: 5, qty: 7 },
  { order_id: 5, product_id: 6, qty: 8 },
  { order_id: 5, product_id: 7, qty: 9 },
  { order_id: 8, product_id: 0, qty: 10 },
  { order_id: 8, product_id: 3, qty: 11 },
  { order_id: 8, product_id: 2, qty: 12 },
];

export const fillUsersData = async (usersArray: USER[]) => {
  const user = new Users();
  //let the last record to
  for (let i = 0; i < usersArray.length - 1; i++) {
    await user.create(usersArray[i]);
  }
};

export const fillProductsData = async (productData: PRODUCT[]) => {
  const product = new Products();
  productData.forEach(async (element) => {
    await product.create(element);
  });
};

export const fillOrdersData = async (orderData: OrderData[]) => {
  const order = new Orders();
  const user = new Users();
  const users = await user.index();
  orderData.forEach(async (element) => {
    try {
      await order.create({ user_id: users[element.user].id as string, status: element.status });
    } catch (e) {
      console.log(users[element.user]);
      return;
    }
  });
};

export const fillOrdersProductsData = async (orderProductData: OrderProductData[]) => {
  const order = new Orders();
  const orders = await order.index();
  const product = new Products();
  const products = await product.index();
  orderProductData.forEach(async (element) => {
    await order.insertProduct({
      order_id: orders[element.order_id].id as string,
      product_id: products[element.product_id].id as string,
      qty: element.qty,
    });
  });
};

export const fillDataBase = async () => {
  console.log('Start Filling Database with dummy data');
  await fillUsersData(userDummyData);
  console.log('Done User Data');
  await fillProductsData(productDummyData);
  console.log('Done Product Data');
  await fillOrdersData(ordersDummyData);
  console.log('Done Orders Data');
  await fillOrdersProductsData(orderProductDummyData);
  console.log('Done Orders-Products Data');
};

if (process.env.ENV !== 'test') {
  fillDataBase();
}
