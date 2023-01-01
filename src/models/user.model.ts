import client from '../database';
import { USER } from '../interfaces/interfaces';

export default class Users {
  readonly tableName = 'users';

  // ------------------------------------------- INDEX ---------------------------------

  async index(): Promise<USER[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT id,firstName,lastName FROM ${this.tableName};`;
      const result = await conn.query(sql);
      await conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Failed to fetch users`);
    }
  }

  // --------------------------------------------- SHOW BY ID ----------------------------

  async show(id: string): Promise<USER> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM ${this.tableName} WHERE id = ($1)::uuid;`;
      const result = await conn.query(sql, [id]);
      await conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to fetch user with id = ${id}`);
    }
  }

  // ----------------------------------------------- SHOW BY NAME -------------------------------

  async showByName(firstName: string, lastName: string): Promise<USER> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM ${this.tableName} WHERE firstName = ($1) AND lastName = ($2);`;
      const result = await conn.query(sql, [firstName, lastName]);
      await conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to fetch user ${firstName} ${lastName}`);
    }
  }

  //-------------------------------------------------- CREATE ------------------------------------------

  async create(user: USER): Promise<USER> {
    try {
      const { firstName, lastName, password } = user;
      const conn = await client.connect();
      const sql = `INSERT INTO ${this.tableName} (firstName, lastName, password) VALUES ($1,$2,$3) RETURNING id,firstName,lastName;`;
      const result = await conn.query(sql, [firstName, lastName, password]);
      await conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to create user ${user.firstName} ${user.lastName}`);
    }
  }

  //--------------------------------------------------- GET USER PASSWORD BY ID ---------------------------

  async get_password(id: string): Promise<string> {
    try {
      const conn = await client.connect();
      const sql = `SELECT password FROM ${this.tableName} WHERE id = ($1)::uuid;`;
      const result = await conn.query(sql, [id]);
      await conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Failed to fetch password for user with id = ${id}`);
    }
  }
}
