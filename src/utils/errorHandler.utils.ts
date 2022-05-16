import Joi from 'joi';

import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { iApiErrorResponse } from '../common/dto/apiResponse.dto';

/**
 * Builds error object for the type of error passed.
 *
 */
export function getErrorObject(err: any): iApiErrorResponse {
    let defaultError: any = {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    };

    if (err.isJoi) {
        return {
            code: StatusCodes.BAD_REQUEST,
            message: getReasonPhrase(StatusCodes.BAD_REQUEST),
            data:
                err.details &&
                err.details.map((e: Joi.ValidationErrorItem) => ({
                    param: e.path.join('.'),
                    message: e.message,
                })),
        };
    }

    if (err.isCustom) {
        return {
            code: err.statusCode,
            message: err.message,
        };
    }

    return defaultError;
}
