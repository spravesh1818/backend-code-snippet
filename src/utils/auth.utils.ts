import { Request } from 'express';

import { http } from './network.utils';
import authConfig from '../../Config/auth.config';
import UnauthorizedError from '../common/exceptions/UnauthorizedError';

const getAuthToken = (authorization: string | undefined, authType: string) => {
    const authComponents = authorization && authorization.split(' ');

    if (
        authComponents &&
        authComponents[0] === authType &&
        authComponents[1] !== undefined
    ) {
        return authComponents[1];
    }

    return;
};

/**
 * Get token from header in request.
 *
 * @param {Request} req
 */
const getTokenFromHeaders = (req: Request) => {
    const {
        headers: { authorization },
    } = req;

    const authToken = getAuthToken(authorization, 'Bearer');

    if (!authToken) {
        throw new UnauthorizedError('No authorization token');
    }

    return authToken;
};

export function fetchUserByToken(token: string) {
    const userAuthUrl = `${authConfig.url}/userinfo`;

    return http
        .get(userAuthUrl, {
            headers: {
                accessToken: token,
                clientId: authConfig.clientId,
            },
        })
        .then((response: any) => {
            return response.data;
        });
}

/**
 * Validate current user with token received in header.
 *
 */
export async function validateUser(req: Request): Promise<object> {
    const token = getTokenFromHeaders(req);

    const user = await fetchUserByToken(token);
    if (!user) {
        throw new UnauthorizedError('No user information token');
    }

    return user;
}
