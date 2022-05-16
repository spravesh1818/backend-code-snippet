import { UserFilter, UserPayload } from "../../common/dto/user.dto";
import * as userDao from "../daos/users.dao";

export async function insertUser(userData: UserPayload) {
  userData = {
    ...userData,
  };

  const response = await userDao.insert(userData);

  return response;
}

export async function getUsers(filter?: UserFilter) {
  let result = await userDao.find(filter);

  return result;
}
