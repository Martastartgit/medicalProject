import {verify, VerifyErrors} from 'jsonwebtoken';

import {CodesEnum, RolesEnum} from '../constants';
import {config} from '../config';
import {customErrors, ErrorHandler} from '../errors';

export const tokenRefreshVerificator = (role: RolesEnum, token: string): Promise<VerifyErrors | null> => {
  try {
    let isTokenValid;
    switch (role) {
      case RolesEnum.ADMIN:
        isTokenValid = verify(token, config.JWT_REFRESH_SECRET_ADMIN) as Promise<VerifyErrors | null> ;
        break;
      case RolesEnum.USER:
        isTokenValid = verify(token, config.JWT_REFRESH_SECRET) as Promise<VerifyErrors | null> ;
        break;

      default:
        throw new ErrorHandler(
          CodesEnum.BAD_REQUEST,
          customErrors.BAD_REQUEST_NO_ROLE_TYPE.message,
          customErrors.BAD_REQUEST_NO_ROLE_TYPE.code);
    }

    return isTokenValid;

  } catch (e) {
    throw new ErrorHandler(
      CodesEnum.UNAUTHORIZED,
      customErrors.UNAUTHORIZED_BAD_TOKEN.message,
      customErrors.UNAUTHORIZED_BAD_TOKEN.code);

  }

};
