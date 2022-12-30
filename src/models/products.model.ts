import client from '../database';

export interface PRODUCT {
  name: string;
  price: number;
  category: string;
  id?: string;
}

export default class Products {
  readonly tableName = 'products';

  // ------------------------------------------- INDEX ---------------------------------

  async index(): Promise<PRODUCT[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM ${this.tableName};`;
      const result = await conn.query(sql);
      await conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Failed to fetch products`);
    }
  }

  //-------------------------------------------------- CREATE ------------------------------------------

  async create(product: PRODUCT): Promise<PRODUCT> {
    try {
      const { name, price, category } = product;
      const conn = await client.connect();
      const sql = `INSERT INTO ${this.tableName} (name, price, category) VALUES ($1,$2,$3) RETURNING *;`;
      const result = await conn.query(sql, [name, price, category]);
      await conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to create product ${product.name}`);
    }
  }

  // --------------------------------------------- SHOW BY ID ----------------------------

  async show(id: string): Promise<PRODUCT> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM ${this.tableName} WHERE id = ($1)::uuid;`;
      const result = await conn.query(sql, [id]);
      await conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to fetch product with id = ${id} `);
    }
  }

  // ----------------------------------------------- SHOW BY NAME -------------------------------

  async showByName(name: string): Promise<PRODUCT> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM ${this.tableName} WHERE name = ($1);`;
      const result = await conn.query(sql, [name]);
      await conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to fetch product ${name} `);
    }
  }

  // ----------------------------------------------- SHOW BY CATEGORY -------------------------------

  async showByCategory(category: string): Promise<PRODUCT[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM ${this.tableName} WHERE category = ($1);`;
      const result = await conn.query(sql, [category]);
      await conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Failed to fetch products with category ${category}`);
    }
  }
}
