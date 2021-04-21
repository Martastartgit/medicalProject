import {Request, Response} from 'express';
import {CodesEnum} from '../constants';

export const limitReached = (req: Request, res: Response): void => {
  console.warn({ ip: req.ip });

  res.status(CodesEnum.Too_Many_Requests).send('Too many requests. Try again later.');
};
