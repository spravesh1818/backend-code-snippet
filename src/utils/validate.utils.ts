import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

/**
 * Utility helper for Joi validation.
 *
 * @param <T> data
 * @param <Joi.SchemaLike> schema
 * @returns <Promise>
 */
export async function validate<T>(data: T, schema: Joi.Schema): Promise<any> {
    if (schema) {
        return schema.validate(data, { abortEarly: false });
    }
}

/**
 * Middleware to validate schemas.
 *
 * @param {Joi.Schema} params
 */
export function schema(params: Joi.Schema) {
    return async (
        req: Request,
        _: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { error } = await validate(req.body, params);

            error ? next(error) : next();
        } catch (err) {
            next(err);
        }
    };
}
