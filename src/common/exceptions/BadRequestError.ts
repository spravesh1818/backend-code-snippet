import { StatusCodes } from 'http-status-codes';

import Error from './Error';

class BadRequestError extends Error {
    constructor(message: string) {
        super(message, StatusCodes.BAD_REQUEST);
    }
}

export default BadRequestError;
