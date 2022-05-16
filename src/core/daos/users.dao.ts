import User from '../../core/models/users.model';
import { iUserPayload, iUserFilter } from '../../common/dto/user.dto';

export async function insert(userData: iUserPayload) {
    const user = new User({
        ...userData.data,
    });

    return await user.save();
}

export async function find(filter?: iUserFilter) {
    if (filter) {
        return await User.findOne(filter);
    }

    return await User.find();
}
