import client from '../database';
import { PRODUCT } from './products.model';

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

export default class Orders {
  readonly tableName = 'orders';

  // ------------------------------------------- INDEX ---------------------------------
  async index(): Promise<(ORDER & ORDER_PRODUCT & PRODUCT)[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT o.id as order_id , o.status as status , o.user_id as user_id ,
      op.product_id as product_id, op.qty as qty ,p.name as name , p.id as product_id,p.price as price,p.category as category
       FROM orders o 
        LEFT JOIN order_product op ON o.id = op.order_id 
        LEFT JOIN products p ON op.product_id = p.id 
        ORDER BY o.id DESC;`;
      const result = await conn.query(sql);
      await conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Failed to fetch orders ${e}`);
    }
  }
  // --------------------------------------------- CURRENT ORDER BY USER ID ----------------------------

  async currentOrder(userID: string): Promise<ORDER | ORDER_PRODUCT> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM ${this.tableName} WHERE user_id = ($1)::uuid AND status='active' INNER JOIN order_product ON orders.id = order_product.id;`;
      const result = await conn.query(sql, [userID]);
      await conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to fetch current Order for user ${userID}`);
    }
  }

  // --------------------------------------------- Completed ORDERs BY USER ID ----------------------------

  async compeletedOrders(userID: string): Promise<(ORDER | ORDER_PRODUCT)[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM ${this.tableName} WHERE user_id = ($1)::uuid AND status='complete' INNER JOIN order_product ON orders.id = order_product.id;`;
      const result = await conn.query(sql, [userID]);
      await conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Failed to fetch current Order for user ${userID}`);
    }
  }

  //-------------------------------------------------- CREATE ------------------------------------------

  async create(order: ORDER): Promise<ORDER> {
    try {
      const { user_id, status } = order;
      const conn = await client.connect();
      const sql = `INSERT INTO ${this.tableName} (user_id, status) VALUES ($1,$2) RETURNING *;`;
      const result = await conn.query(sql, [user_id, status]);
      await conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to create order for user ${order.user_id} `);
    }
  }

  //-------------------------------------------------- Insert Product to order--------------------------

  async insertProduct(item: ORDER_PRODUCT): Promise<ORDER_PRODUCT> {
    try {
      const { order_id, product_id, qty } = item;
      const conn = await client.connect();
      const sql = `INSERT INTO order_product (order_id,product_id, qty) VALUES ($1,$2,$3) RETURNING *;`;
      const result = await conn.query(sql, [order_id, product_id, qty]);
      await conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(
        `Failed to add product ${item.product_id} to order ${item.order_id},Check if order already exists ${e}`
      );
    }
  }
}
