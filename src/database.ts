import config from './config';
import { Pool } from 'pg';
//You must replace this var with yours in .env
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = config;
const client = new Pool({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
});

export default client;
