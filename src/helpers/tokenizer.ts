import * as jwt from 'jsonwebtoken';

import {AdminsActionEnum, CodesEnum, UsersActionEnum} from '../constants';
import {customErrors, ErrorHandler} from '../errors';
import {config} from '../config';

export const tokenizer = (action: AdminsActionEnum | UsersActionEnum ): {access_token: string, refresh_token: string} => {
  let access_token = '';
  let refresh_token = '';

  switch (action) {
    case AdminsActionEnum.ADMIN_REGISTER:
    case UsersActionEnum.USER_REGISTER:
      access_token = jwt.sign({}, config.JWT_CONFIRM_EMAIL_SECRET, {expiresIn: config.JWT_CONFIRM_EMAIL_LIFETIME});
      break;

    case AdminsActionEnum.ADMIN_LOGIN:
      access_token = jwt.sign({},config.JWT_ACCESS_SECRET_ADMIN, {expiresIn: config.ACCESS_TOKEN_LIFETIME});
      refresh_token = jwt.sign({}, config.JWT_REFRESH_SECRET_ADMIN, {expiresIn: config.REFRESH_TOKEN_LIFETIME});
      break;

    case UsersActionEnum.USER_LOGIN:
      access_token = jwt.sign({}, config.JWT_ACCESS_SECRET, {expiresIn: config.ACCESS_TOKEN_LIFETIME});
      refresh_token = jwt.sign({}, config.JWT_REFRESH_SECRET, {expiresIn: config.REFRESH_TOKEN_LIFETIME});
      break;

    case AdminsActionEnum.FORGOT_PASSWORD:
    case UsersActionEnum.FORGOT_PASSWORD:
      access_token = jwt.sign({}, config.JWT_PASS_RESET_SECRET, {expiresIn: config.JWT_PASS_RESET_LIFETIME});
      break;

    default:
      throw new ErrorHandler(CodesEnum.SERVER, customErrors.WRONG_ACTION.message, customErrors.WRONG_ACTION.code);

  }

  return {
    access_token,
    refresh_token
  };

};
