import { Response, NextFunction } from 'express';

import { validateUser } from '../../utils/auth.utils';
import UnauthorizedError from '../../common/exceptions/UnauthorizedError';
import { AuthenticatedRequest } from '../../common/interfaces/AuthRequest';

export async function authenticateRequest(
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction
) {
    try {
        const {
            headers: { authorization },
        } = req;

        if (!authorization) {
            throw new UnauthorizedError('No Authorization Token');
        }

        const requestAuthenticationTag =
            authorization && authorization.split(' ')[0];

        if (requestAuthenticationTag === 'Bearer') {
            req.currentUser = await validateUser(req);

            return next();
        }
    } catch (err) {
        next(err);
    }
}
