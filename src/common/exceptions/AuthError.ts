import { StatusCodes } from "http-status-codes";

import Error from "./Error";

class AuthError extends Error {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export default AuthError;
