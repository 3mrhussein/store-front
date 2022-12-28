import client from '../database';

export type Weapon = {
  name: string;
  type: string;
  weight: number;
  id?: number;
};

export class MythicalWeaponStore {
  tableName = 'mythical_weapons';

  async index(): Promise<Weapon[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM ${this.tableName};`;
      const result = await conn.query(sql);
      await conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`Cannot get weapons ${e}`);
    }
  }

  async insert(name: string, type: string, weight: number): Promise<void> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO ${this.tableName} (name,type,weight) VALUES ('${name}','${type}',${weight});`;
      const result = await conn.query(sql);
      await conn.release();
    } catch (err) {
      throw new Error(`Failed to insert to ${this.tableName} ${err}`);
    }
  }
}
