import express, { Express, Request, Response, NextFunction } from 'express';
import config from './config';

import errorMiddleware from './middlewares/error.middleware';
import routes from './routes';
import { Users } from './models/users';
const app: Express = express();
const PORT = config.PORT || 4000;

app.use(express.json());

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = new Users();
    const data = await user.index();
    res.send(data);
  } catch (err) {
    next(err);
  }
});
app.get('/error', (_req: Request, _res: Response, next: NextFunction) => {
  next({
    message: 'Error Message',
    status: 408,
  });
});

app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('*', (_req: Request, _res: Response) => {
  throw new Error('Not Found');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Listen to PORT ', PORT);
});
