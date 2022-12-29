import { NextFunction, Request, Response } from 'express';
import { maxPassword } from '../../utils';

const validateUser_MW = (req: Request, res: Response, next: NextFunction) => {
  let errMessage = '';

  if (!req.body.firstName) {
    //if firstName is missing
    errMessage += 'firstName is Required,\n ';
  } else if (req.body.firstName.length > 50 || req.body.firstName.length < 3) {
    //lastName length ranges from 3 to 50
    errMessage += 'firstName length must ranges from 3 to 50 characters,\n ';
  }

  if (!req.body.lastName) {
    //if lastName is missing
    errMessage += 'lastName is Required,\n ';
  } else if (req.body.lastName.length > 50 || req.body.lastName.length < 3) {
    //lastName length ranges from 3 to 50
    errMessage += 'lastName length must ranges from 3 to 50 characters,\n ';
  }

  if (!req.body.password) {
    //if password is missing
    errMessage += 'password is Required,\n ';
  } else if (req.body.password.length >= maxPassword() || req.body.password.length < 6) {
    //password length ranges from 6 to maxPassword()
    errMessage += `password length must ranges from 6 to ${maxPassword()},\n `;
  }

  if (errMessage) {
    next({ status: 400, message: errMessage });
  } else {
    next();
  }
};

export default validateUser_MW;
