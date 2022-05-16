import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

import * as userService from "../services/user.service";

export async function addUser(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await userService.insertUser(req.body);

    res.send({
      status: StatusCodes.OK,
      message: "User Successfully saved",
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

export async function getUsers(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await userService.getUsers();

    res.send({
      status: StatusCodes.OK,
      data: response,
    });
  } catch (err) {
    next(err);
  }
}
