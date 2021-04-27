import {AdminsActionEnum, CodesEnum, RequestHeadersEnum, RolesEnum} from '../../constants';
import {IRequest} from '../../interfaces';
import {NextFunction, Response} from 'express';
import {customErrors, ErrorHandler} from '../../errors';
import {tokenVerificator} from '../../helpers';
import {authService} from '../../services';

export const checkAccessTokenMiddleware = (role: RolesEnum) =>
  async (req: IRequest, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    try {
      const token = await req.get(RequestHeadersEnum.AUTHORIZATION);

      if (!token){
        return next(new ErrorHandler(CodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NO_TOKEN.message));
      }

      switch (role) {
        case RolesEnum.ADMIN:
          await tokenVerificator(AdminsActionEnum.ADMIN_LOGIN, token);

          const adminByToken = await authService.findAdminByToken({accessToken: token});

          if (!adminByToken) {
            throw new ErrorHandler(CodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message);
          }

          req.admin = adminByToken;
          break;

        default:
          throw new ErrorHandler(CodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NO_ROLE_TYPE.message);

      }

      next();
    } catch (e) {
      next(e);
    }

  };
