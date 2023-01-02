import express, { Express, NextFunction, Request, Response, urlencoded } from 'express';
import errorMiddleware from './middlewares/error.middleware';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import config from './config';
import routes from './routes';
import path from 'path';
import { fillDataBase } from './tests/testData';
declare module 'express-session' {
  interface SessionData {
    returnTo?: string;
  }
}
export const app: Express = express();
const PORT = config.PORT || 4000;
app.use(express.static('public'));
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve('public/home.html'));
});

app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('*', (_req: Request, _res: Response, next: NextFunction) => {
  next({ status: 404, message: 'Not Found' });
});

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log('Listen to PORT ', PORT);
});
