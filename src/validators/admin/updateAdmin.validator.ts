import * as joi from 'joi';

import {RegexpEnum} from '../../constants';

export const updateAdminValidator = joi.object({
  name: joi.string().trim().min(4).max(25).required(),
  surname: joi.string().trim().min(2).max(50).required(),
  email: joi.string().trim().regex(RegexpEnum.email).required()
});
