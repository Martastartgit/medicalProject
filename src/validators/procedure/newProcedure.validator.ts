import * as joi from 'joi';

export const newProcedureValidator = joi.object({
  name: joi.string().trim().min(2).max(50).required(),
  description: joi.string().trim().min(2).max(9999).required(),
  price: joi.number().min(0.1).max(999999).required(),
  hasDiscount: joi.boolean(),
  oldPrice:  joi.number().min(0.1).max(999999)
    .when('hasDiscount', {is: true, then: joi.required()})
});
