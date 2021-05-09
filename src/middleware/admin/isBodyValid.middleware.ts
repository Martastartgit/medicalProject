import {NextFunction, Request, Response} from 'express';

import {newAdminValidator} from '../../validators/admin';
import {CodesEnum, RolesEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';

export const isBodyValidMiddleware = (role: RolesEnum) => (req: Request, res: Response, next: NextFunction): void => {
  try {
    switch (role) {
      case RolesEnum.ADMIN:
        const {error} = newAdminValidator.validate(req.body);

        if (error) {
          throw new ErrorHandler(CodesEnum.BAD_REQUEST, error.details[0].message);
        }
        break;
      // case RolesEnum.USER:
      default:
        throw new ErrorHandler(
          CodesEnum.BAD_REQUEST,
          customErrors.BAD_REQUEST_NO_ROLE_TYPE.message,
          customErrors.BAD_REQUEST_NO_ROLE_TYPE.code);

    }
    next();
  } catch (e) {
    next(e);
  }
};
