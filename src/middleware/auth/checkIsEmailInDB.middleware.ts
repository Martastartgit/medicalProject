import {CodesEnum, RolesEnum} from '../../constants';
import {IRequest} from '../../interfaces';
import {NextFunction, Response} from 'express';
import {adminService} from '../../services/admin';
import {customErrors, ErrorHandler} from '../../errors';

export const checkIsEmailInDBMiddleware = (role: RolesEnum) =>
  async (req: IRequest, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    try {
      switch (role){
        case RolesEnum.ADMIN:
          const {email} = req.body ;
          const adminWithEmail = await adminService.findOneByParams({email});

          if (!adminWithEmail){
            return next(new ErrorHandler(CodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
          }

          req.admin = adminWithEmail;
          break;

          // case RolesEnum.USER:

        default:
          return next(new ErrorHandler(
            CodesEnum.BAD_REQUEST,
            customErrors.BAD_REQUEST_NO_ROLE_TYPE.message,
            customErrors.BAD_REQUEST_NO_ROLE_TYPE.code)) ;
      }
      next();
    } catch (e) {
      next(e);
    }

  };
