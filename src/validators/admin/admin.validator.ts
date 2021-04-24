import * as joi from 'joi';

import {RegexpEnum} from '../../constants';

export const newAdminValidator = joi.object({
  name: joi.string().trim().min(4).max(25).required(),
  surname: joi.string().trim().min(2).max(50).required(),
  password: joi.string().trim().regex(RegexpEnum.password).required(),
  email: joi.string().trim().regex(RegexpEnum.email).required()
});
