import {NextFunction, Request, Response} from 'express';

import {CodesEnum} from '../../constants';
import {ErrorHandler} from '../../errors';
import {departmentValidator} from '../../validators';

export const departmentValidationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const {error} = departmentValidator.validate(req.body);

  if (error) {
    return next(new ErrorHandler(CodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
