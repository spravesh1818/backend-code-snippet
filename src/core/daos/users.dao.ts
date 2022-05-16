import User from "../../core/models/users.model";
import { UserPayload, UserFilter } from "../../common/dto/user.dto";

export async function insert(userData: UserPayload) {
  const user = new User({
    ...userData.data,
  });

  return await user.save();
}

export async function find(filter?: UserFilter) {
  if (filter) {
    return await User.findOne(filter);
  }

  return await User.find();
}
