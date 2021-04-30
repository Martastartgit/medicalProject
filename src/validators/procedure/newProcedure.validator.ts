import * as joi from 'joi';

export const newProcedureValidator = joi.object({
  name: joi.string().trim().min(2).max(50),
  description: joi.string().trim().min(2).max(9999),
  symptoms: joi.string().trim().min(2).max(9999),
  causes: joi.string().trim().min(2).max(9999),
  diagnosis: joi.string().trim().min(2).max(9999),
  treatment: joi.string().trim().min(2).max(9999)
});
