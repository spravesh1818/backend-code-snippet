import { iUserFilter, iUserPayload } from '../../common/dto/user.dto';
import * as userDao from '../daos/users.dao';
import BadRequestError from '../../common/exceptions/BadRequestError';

export async function insertUser(userData: iUserPayload) {
    userData = {
        ...userData,
    };

    const response = await userDao.insert(userData);

    return response;
}

export async function getUsers(filter?: iUserFilter) {
    let result = await userDao.find(filter);

    if (!result) {
        const errorMessage = `User ${
            filter ? `with _id: ${filter._id}` : ''
        } doesn't exist.`;
        throw new BadRequestError(errorMessage);
    }

    return result;
}
