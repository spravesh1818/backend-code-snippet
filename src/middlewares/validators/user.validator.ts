import Joi from 'joi';

/**
 * Validator for User schema.
 */
const userValidator = Joi.object({
    data: Joi.object({
        name: Joi.string().disallow('').required(),
        email: Joi.string().disallow('').required(),
    }).required(),
});

export default userValidator;
