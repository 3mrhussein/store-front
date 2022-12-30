import client from '../database';
import { PRODUCT } from './products.model';

export interface ORDER {
  user_id: string;
  status: string;
  id?: string;
}

export default class Orders {
  readonly tableName = 'orders';

  // ------------------------------------------- INDEX ---------------------------------
  async index(): Promise<ORDER[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM ${this.tableName};`;
      const result = await conn.query(sql);
      await conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Failed to fetch orders`);
    }
  }
  // --------------------------------------------- CURRENT ORDER BY USER ID ----------------------------

  async currentOrder(userID: string): Promise<(ORDER | PRODUCT)[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM ${this.tableName} WHERE user_id = ($1)::uuid AND status='active' INNER JOIN order_product ON orders.id = order_product.id;`;
      const result = await conn.query(sql, [userID]);
      await conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Failed to fetch current Order for user ${userID}`);
    }
  }

  // --------------------------------------------- CURRENT ORDER BY USER ID ----------------------------

  async compeletedOrders(userID: string): Promise<ORDER[]> {
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
}
