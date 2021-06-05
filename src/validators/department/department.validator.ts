import * as joi from 'joi';

const servicesSubScheme = joi.array().items(
  joi.object({
    title: joi.string().trim().min(2).max(99).required(),
    price: joi.number().min(0.1).max(999999).required()
  })
);

export const departmentValidator = joi.object({
  name: joi.string().trim().required(),
  Doctors: joi.array().items(joi.string().min(24).max(24)).required(),
  Procedures: joi.array().items(joi.string().min(24).max(24)).required(),
  Services: servicesSubScheme
});
