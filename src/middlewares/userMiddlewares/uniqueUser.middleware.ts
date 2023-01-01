import { NextFunction, Request, Response } from 'express';
import { USER } from '../../interfaces/interfaces';
import Users from '../../models/user.model';

const uniqueUser_MW = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //check if user is unique base on firstName & lastName maybe handeled to check for only email later
  const newUser: USER = {
    firstName: req.body.firstName as string,
    lastName: req.body.lastName as string,
    password: req.body.password as string,
  };

  const user = new Users();
  try {
    const userExist = await user.showByName(newUser.firstName, newUser.lastName);
    if (userExist) {
      next({ status: 404, message: 'User already exists' });
    } else next();
  } catch (err) {
    next(err);
  }
};

export default uniqueUser_MW;
