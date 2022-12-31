import { NextFunction, Request, Response } from 'express';
import { maxPassword } from '../../utils';

interface ErrorMessage {
  firstName: string;
  lastName: string;
  password: string;
}

const validateUserParams_MW = (req: Request, res: Response, next: NextFunction) => {
  const errMessage: ErrorMessage = { firstName: '', lastName: '', password: '' };
  if (!req.body.firstName) {
    //if firstName is missing
    errMessage.firstName += 'firstName is Required,\n ';
  } else if (req.body.firstName.length > 50 || req.body.firstName.length < 3) {
    //lastName length ranges from 3 to 50
    errMessage.firstName += 'firstName length must ranges from 3 to 50 characters,\n ';
  }

  if (!req.body.lastName) {
    //if lastName is missing
    errMessage.lastName += 'lastName is Required,\n ';
  } else if (req.body.lastName.length > 50 || req.body.lastName.length < 3) {
    //lastName length ranges from 3 to 50
    errMessage.lastName += 'lastName length must ranges from 3 to 50 characters,\n ';
  }

  if (!req.body.password) {
    //if password is missing
    errMessage.lastName += 'password is Required,\n ';
  } else if (req.body.password.length >= maxPassword() || req.body.password.length < 6) {
    //password length ranges from 6 to maxPassword()
    errMessage.lastName += `password length must ranges from 6 to ${maxPassword()},\n `;
  }

  if (errMessage.firstName || errMessage.lastName || errMessage.password) {
    next({ status: 400, message: errMessage });
  } else {
    next();
  }
};

export default validateUserParams_MW;
