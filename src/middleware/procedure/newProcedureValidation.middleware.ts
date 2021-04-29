import {NextFunction, Request, Response} from 'express';

import {newProcedureValidator} from '../../validators';
import {ErrorHandler} from '../../errors';
import {CodesEnum} from '../../constants';

export const newProcedureValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {error} = newProcedureValidator.validate(req.body);

  if (error){
    return next(new ErrorHandler(CodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
