import {CodesEnum, RolesEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';
import { IRequest} from '../../interfaces';
import {NextFunction, Response} from 'express';
import {adminService} from '../../services';

export const changeEmailMiddleware = (role: RolesEnum) =>
  async (req: IRequest, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    try {
      switch (role) {
        case RolesEnum.ADMIN:
          const {email} = req.body;
          const { adminId } = req.params;

          const { id } = await adminService.findOneByParams({email}) || {};

          if (id) {
            if (id !== adminId) {
              throw new ErrorHandler(
                CodesEnum.BAD_REQUEST,
                customErrors.BAD_REQUEST_EMAIL_EXIST.message,
                customErrors.BAD_REQUEST_EMAIL_EXIST.code);
            }
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
