import {CodesEnum, RolesEnum} from '../../constants';
import {NextFunction, Request, Response} from 'express';
import {adminService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';

export const isEmailExistMiddleware = (role: RolesEnum) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    try {
      switch (role) {
        case RolesEnum.ADMIN:
          const {email} = req.body;
          const adminWithEmail = await adminService.findOneByParams({email});

          if (adminWithEmail) {
            throw new ErrorHandler(
              CodesEnum.BAD_REQUEST,
              customErrors.BAD_REQUEST_EMAIL_EXIST.message,
              customErrors.BAD_REQUEST_EMAIL_EXIST.code);
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
