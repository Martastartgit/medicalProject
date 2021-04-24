import {verify, VerifyErrors} from 'jsonwebtoken';

import {AdminsActionEnum, CodesEnum, UsersActionEnum} from '../constants';
import {config} from '../config';
import {customErrors, ErrorHandler} from '../errors';

export const tokenVerificator = (action: AdminsActionEnum | UsersActionEnum, token: string): Promise<VerifyErrors | null> => {
  try {
    let isTokenValid;

    switch (action) {
      case AdminsActionEnum.ADMIN_REGISTER:
      case UsersActionEnum.USER_REGISTER:
        isTokenValid = verify(token, config.JWT_CONFIRM_EMAIL_SECRET) as Promise<VerifyErrors | null> ;
        break;

      case AdminsActionEnum.ADMIN_LOGIN:
        isTokenValid = verify(token, config.JWT_ACCESS_SECRET_ADMIN) as Promise<VerifyErrors | null>;
        break;

      case UsersActionEnum.USER_LOGIN:
        isTokenValid = verify(token, config.JWT_ACCESS_SECRET) as Promise<VerifyErrors | null>;
        break;

      case AdminsActionEnum.FORGOT_PASSWORD:
      case UsersActionEnum.FORGOT_PASSWORD:
        isTokenValid = verify(token, config.JWT_PASS_RESET_SECRET) as Promise<VerifyErrors | null>;
        break;

      default:
        throw new ErrorHandler(CodesEnum.SERVER, customErrors.WRONG_ACTION.message, customErrors.WRONG_ACTION.code);

    }

    return isTokenValid;

  } catch (e) {
    throw new ErrorHandler(
      CodesEnum.UNAUTHORIZED,
      customErrors.UNAUTHORIZED_BAD_TOKEN.message,
      customErrors.UNAUTHORIZED_BAD_TOKEN.code);

  }
};
