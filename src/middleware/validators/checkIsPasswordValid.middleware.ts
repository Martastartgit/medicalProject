import {NextFunction, Response} from 'express';
import {IRequest} from '../../interfaces';
import {passwordValidator} from '../../validators';
import {ErrorHandler} from '../../errors';
import {CodesEnum} from '../../constants';

export const checkIsPasswordValidMiddleware = (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const {error} = passwordValidator.validate(req.body);

    if (error) {
      throw new ErrorHandler(CodesEnum.BAD_REQUEST, error.details[0].message);

    }

    next();
  } catch (e) {
    next(e);
  }

};
