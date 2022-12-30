import dotenv from 'dotenv';

dotenv.config();

const SESSION_SECRET = process.env.SESSION_SECRET as string;
const TOKEN_SECRET = process.env.TOKEN_SECRET as string;
const DB_PASSWORD = process.env.POSTGRES_PASSWORD;
const DB_PORT = +(process.env.DB_PORT as string);
const PORT = +(process.env.PORT as string);
const DB_HOST = process.env.POSTGRES_HOST;
const PEPPER = process.env.PEPPER;

let DB_USER, DB_NAME;

if (process.env.ENV === 'test') {
  DB_USER = process.env.POSTGRES_USER_TEST;
  DB_NAME = process.env.POSTGRES_DB_TEST;
} else if (process.env.ENV === 'prod') {
  DB_USER = process.env.POSTGRES_USER;
  DB_NAME = process.env.POSTGRES_DB;
} else {
  DB_USER = process.env.POSTGRES_USER_DEV;
  DB_NAME = process.env.POSTGRES_DB_DEV;
}

export default {
  PORT,
  PEPPER,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  TOKEN_SECRET,
  SESSION_SECRET,
};
