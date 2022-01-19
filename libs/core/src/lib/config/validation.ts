import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().default(5000),
  DATABASE_URL: Joi.string()
    .required()
    .regex(/^postgresql/),
});
