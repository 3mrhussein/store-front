import express, { Express, Request, Response, NextFunction } from 'express';
import config from './config';

import { MythicalWeaponStore } from './models/mythical_weapons';
import errorMiddleware from './middlewares/error.middleware';
import routes from './routes';
const app: Express = express();
const PORT = config.PORT || 4000;

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  const mythical_weapon = new MythicalWeaponStore();
  const data = await mythical_weapon.index();
  res.send('Hello');
});

app.get('/error', (_req: Request, _res: Response, next: NextFunction) => {
  next({ message: 'Error Message', status: 408 });
});

app.use(routes);

app.get('*', (_req: Request, _res: Response) => {
  throw new Error('Not Found');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Listen to PORT ', PORT);
});
