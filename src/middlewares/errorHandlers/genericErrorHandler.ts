import { Request, Response, NextFunction } from "express";
import log from "loglevel";

import { getErrorObject } from "../../utils/errorHandler.utils";

export default function genericErrorHandler(
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
): void {
  log.error(`Generic error: ${JSON.stringify(err, undefined, 2)}`);
  const error = getErrorObject(err);

  res.status(error.code).json(error);
}
