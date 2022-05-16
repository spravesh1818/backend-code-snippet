import { Request, Response, NextFunction } from 'express';

import { getErrorObject } from '../../utils/errorHandler.utils';

export default function genericErrorHandler(
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    console.log(`Generic error: ${JSON.stringify(err, undefined, 2)}`);
    const error = getErrorObject(err);

    res.status(error.code).json(error);
}
