import {IRequest} from '../../interfaces';
import {NextFunction, Response} from 'express';
import {CodesEnum, RequestHeadersEnum, RolesEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';
import {tokenRefreshVerificator} from '../../helpers';
import {authService} from '../../services';

export const checkRefreshTokenMiddleware =(role: RolesEnum) =>
  async (req: IRequest, res: Response, next: NextFunction): Promise<void | NextFunction>=> {
    try {
      let tokens;
      const refresh_token = await req.get(RequestHeadersEnum.AUTHORIZATION);

      if (!refresh_token) {
        return next(new ErrorHandler(CodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NO_TOKEN.message));
      }

      switch (role) {
        case RolesEnum.ADMIN:
          await tokenRefreshVerificator(RolesEnum.ADMIN, refresh_token);

          tokens = await authService.findTokenByParams({refreshToken: refresh_token});

          if (!tokens) {
            return next(new ErrorHandler(CodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));

          }
          req.token = tokens;
          break;

        case RolesEnum.USER:
          await tokenRefreshVerificator(RolesEnum.USER, refresh_token);

          tokens = await authService.findTokenByParams({refresh_token});

          if (!tokens) {
            return next(new ErrorHandler(CodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
          }

          req.token = tokens;
          break;

        default:
          return next(new ErrorHandler(CodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NO_ROLE_TYPE.message));

      }

      next();
    } catch (e) {
      next(e);
    }

  };
