export interface Error {
  name: string;
  message: string;
  stack?: string;
  status?: number;
}

export interface ORDER {
  user_id: string;
  status: 'complete' | 'active';
  id?: string;
}

export interface ORDER_PRODUCT {
  order_id: string;
  product_id: string;
  qty: number;
  id?: string;
}

export interface PRODUCT {
  name: string;
  price: number;
  category: string;
  id?: string;
}

export interface USER {
  firstName: string;
  lastName: string;
  password: string;
  id?: string;
}

export interface ORDER_ITEM {
  product?: PRODUCT | null;
  qty?: number | null;
}

export interface ORGANIZED_ORDER {
  orderID: string;
  userID: string;
  status: string;
  productList: ORDER_ITEM[];
}
