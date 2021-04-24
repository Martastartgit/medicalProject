import {CodesEnum, StatusEnum} from '../../constants';
import {IAdmin, IRequest} from '../../interfaces';
import {NextFunction, Response} from 'express';
import {customErrors, ErrorHandler} from '../../errors';

export const checkStatusMiddleware = (status: StatusEnum ) =>
  (req: IRequest, res: Response, next: NextFunction): void | NextFunction => {
    try {
      switch (status) {
        case StatusEnum.ADMIN_PENDING:
          const admin = req.admin as IAdmin;

          if (admin.status !== StatusEnum.ADMIN_PENDING) {
            return next(new ErrorHandler(
              CodesEnum.BAD_REQUEST,
              customErrors.BAD_REQUEST_ALREADY_ACTIVATED.message,
              customErrors.BAD_REQUEST_ALREADY_ACTIVATED.code));

          }
          break;
        case StatusEnum.ADMIN_CONFIRMED:
          const admin1 = req.admin as IAdmin;
          if (admin1.status !== StatusEnum.ADMIN_CONFIRMED) {
            return next(new ErrorHandler(
              CodesEnum.FORBIDDEN,
              customErrors.FORBIDDEN_NOT_CONFIRMED.message,
              customErrors.FORBIDDEN_NOT_CONFIRMED.code));

          }
          break;

          // case StatusEnum.USER_PENDING:

        default:
          return next(new ErrorHandler(CodesEnum.BAD_REQUEST,
            customErrors.WRONG_ACTION.message));

      }
      next();
    } catch (e) {
      next(e);
    }

  };

