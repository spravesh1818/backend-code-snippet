import Error from './Error';

/**
 * Base class to derive custom exceptions
 */
class DBError extends Error {
    constructor(message: string, statusCode:number) {

        super(message, statusCode);
    }
}

export default DBError;
