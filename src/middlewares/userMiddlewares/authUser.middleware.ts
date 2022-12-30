import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';

const { TOKEN_SECRET } = config;

const authUser_MW = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies.token;
  const url = req.originalUrl;

  const redirectToSignIn = () => {
    req.session.returnTo = url;
    res.redirect('/signin');
  };

  if (token) {
    //if token exists
    await jwt.verify(token, TOKEN_SECRET, function (err: jwt.VerifyErrors | null) {
      if (err) {
        //if token not valid
        redirectToSignIn();
      } else if (url === '/signin' || url === '/signup') {
        //if token is valid and user was trying to access signin or signup redirect to home page
        res.redirect('/');
      } else next();
    });
  } else if (url === '/signin' || url === '/signup') {
    //if user doesn't go to signin or signup let him go
    next();
  } else redirectToSignIn();
};

export default authUser_MW;
