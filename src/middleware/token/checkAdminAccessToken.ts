import {NextFunction, Response} from 'express';

import {AdminsActionEnum, CodesEnum, RequestHeadersEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';
import {tokenVerificator} from '../../helpers';
import {adminService} from '../../services/admin';
import {IRequest} from '../../interfaces';

export const checkAdminAccessTokenMiddleware = (action: AdminsActionEnum) =>
  async (req: IRequest, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    try {
      const token = await req.get(RequestHeadersEnum.AUTHORIZATION);

      if (!token){
        return next(new ErrorHandler(CodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NO_TOKEN.message));
      }

      switch (action) {
        case AdminsActionEnum.ADMIN_REGISTER:
          await tokenVerificator(AdminsActionEnum.ADMIN_REGISTER, token);

          const adminByToken = await adminService.findOneByParams(
            {'tokens.action': AdminsActionEnum.ADMIN_REGISTER, 'tokens.token': token}
          );

          if (!adminByToken) {
            throw new ErrorHandler(CodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message);
          }

          req.admin = adminByToken;
          break;

        case AdminsActionEnum.FORGOT_PASSWORD:
          await tokenVerificator(AdminsActionEnum.FORGOT_PASSWORD, token);

          const adminByToken2 = await adminService.findOneByParams(
            {'tokens.action': AdminsActionEnum.FORGOT_PASSWORD, 'tokens.token': token}
          );

          if (!adminByToken2) {
            throw new ErrorHandler(CodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message);
          }

          req.admin = adminByToken2;
          break;
        default:
          throw new ErrorHandler(CodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NO_ROLE_TYPE.message);

      }

      next();
    } catch (e) {
      next(e);
    }

  };
