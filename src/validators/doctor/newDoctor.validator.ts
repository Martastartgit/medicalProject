import * as joi from 'joi';

const workDay = joi.array().items(
  joi.object({
    day: joi.string(),
    hour: joi.string()
  })
);

const daysOff = joi.array().items(
  joi.object({
    day: joi.string().trim(),
    date: joi.string().trim().optional()
  })
);

export const newDoctorValidator = joi.object({
  fullName: joi.string().min(4).max(100).required(),
  age: joi.number().integer().min(18).max(100),
  experience: joi.string().trim().min(4).max(9999).required(),
  profession: joi.string().trim().min(4).max(50).required(),
  workDay: workDay.required(),
  dayOff: daysOff
});
