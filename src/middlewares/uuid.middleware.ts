import { NextFunction, Request, Response } from 'express';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

const uuid_MW = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  if (uuidValidate(id) && uuidVersion(id) === 4) {
    next();
  } else next({ status: 400, message: 'Invalid UUID' });
};

export default uuid_MW;
