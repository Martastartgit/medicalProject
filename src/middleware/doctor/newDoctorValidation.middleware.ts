import {NextFunction, Request, Response} from 'express';
import {newDoctorValidator} from '../../validators';
import {ErrorHandler} from '../../errors';
import {CodesEnum} from '../../constants';

export const newDoctorValidationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const {error} = newDoctorValidator.validate(req.body);

  if (error) {
    return next(new ErrorHandler(CodesEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};
