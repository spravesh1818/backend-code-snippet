import { Response, NextFunction } from "express";

import { validateUser } from "../../utils/auth.utils";
import { AuthenticatedRequest } from "../../common/interfaces/AuthRequest";
import UnauthorizedError from "../../common/exceptions/UnauthorizedError";
export async function authenticateRequest(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      headers: { authorization },
    } = req;

    if (!authorization) {
      throw new UnauthorizedError("No Authorization Token");
    }

    const requestAuthenticationTag =
      authorization && authorization.split(" ")[0];

    if (requestAuthenticationTag === "Bearer") {
      req.currentUser = await validateUser(req);

      return next();
    }
  } catch (err) {
    next(err);
  }
}
