// import { MythicalWeaponStore, Weapon } from '../mythical_weapons';

import { PRODUCT, USER } from '../interfaces/interfaces';
import Users from '../models/user.model';

export const userDummyData: USER[] = [
  { firstName: 'user', lastName: 'user', password: 'password' },
  { firstName: 'user2', lastName: 'user', password: 'password' },
  { firstName: 'user3', lastName: 'user', password: 'password' },
  { firstName: 'user4', lastName: 'user', password: 'password' },
  { firstName: 'user5', lastName: 'user', password: 'password' },
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
  { user: 4, status: 'complete' },
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

export async function fillUsersData(usersArray: USER[]) {
  const user = new Users();
  //let the last record to
  for (let i = 0; i < usersArray.length - 1; i++) {
    await user.create(usersArray[i]);
  }
}
