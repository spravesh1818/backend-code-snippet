import { StatusCodes } from 'http-status-codes';

import Error from './Error';

class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message, StatusCodes.UNAUTHORIZED);
    }
}

export default UnauthorizedError;
