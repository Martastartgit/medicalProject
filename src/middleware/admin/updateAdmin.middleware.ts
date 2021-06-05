import {NextFunction, Response} from 'express';

import {CodesEnum, RolesEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';
import {IRequest} from '../../interfaces';
import {updateAdminValidator} from '../../validators';

export const isUpdateBodyValidMiddleware = (role: RolesEnum) => (req: IRequest, res: Response, next: NextFunction): void => {
  try {
    switch (role) {
      case RolesEnum.ADMIN:
        const {error} = updateAdminValidator.validate(req.body);

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
