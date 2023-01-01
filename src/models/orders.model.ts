import client from '../database';
import { ORDER, ORDER_PRODUCT, PRODUCT } from '../interfaces/interfaces';

export default class Orders {
  readonly tableName = 'orders';

  // ------------------------------------------- INDEX ---------------------------------

  async index(): Promise<(ORDER & ORDER_PRODUCT & PRODUCT)[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT *
          FROM products p 
          RIGHT JOIN order_product op ON p.id = op.product_id 
          RIGHT JOIN orders o ON  o.id = op.order_id 
          ORDER BY o.id DESC;`;
      const result = await conn.query(sql);
      await conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Failed to fetch orders ${e}`);
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

  // --------------------------------------------- CURRENT ORDER BY USER ID ----------------------------

  async currentOrder(userID: string): Promise<(ORDER & ORDER_PRODUCT & PRODUCT)[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT *
      FROM products p 
      RIGHT JOIN order_product op ON p.id = op.product_id 
      RIGHT JOIN orders o ON  o.id = op.order_id 
      WHERE o.user_id = ($1)::uuid AND o.status = 'active';`;
      const result = await conn.query(sql, [userID]);
      await conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Failed to fetch current Order for user ${userID} ${e}`);
    }
  }

  // --------------------------------------------- Completed ORDERs BY USER ID ----------------------------

  async compeletedOrders(userID: string): Promise<(ORDER & ORDER_PRODUCT & PRODUCT)[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT *
      FROM products p 
      RIGHT JOIN order_product op ON p.id = op.product_id 
      RIGHT JOIN orders o ON  o.id = op.order_id 
      WHERE o.user_id = ($1)::uuid AND o.status = 'complete';`;
      const result = await conn.query(sql, [userID]);
      await conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Failed to fetch current Order for user ${userID}`);
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

  //-------------------------------------------------- End User Active Orders ------------------------------------------

  async setUserOrdersAsComplete(userID: string): Promise<void> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE ${this.tableName} SET status 'complete' WHERE user_id = ($1);`;
      await conn.query(sql, [userID]);
      await conn.release();
      return;
    } catch (e) {
      throw new Error(`Failed to End Active Order For User ${userID} `);
    }
  }
}
