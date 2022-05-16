import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

import * as userService from "../services/user.service";
import BadRequestError from "common/exceptions/BadRequestError";

export async function addUser(req: Request, res: Response) {
  try {
    const response = await userService.insertUser(req.body);

    res.send({
      status: StatusCodes.OK,
      message: "User Successfully saved",
      data: response,
    });
  } catch (err) {
    throw BadRequestError("User could not be created");
  }
}

export async function getUsers(_: Request, res: Response) {
  try {
    const response = await userService.getUsers();

    res.send({
      status: StatusCodes.OK,
      data: response,
    });
  } catch (err) {
    throw BadRequestError("Users could not be fetched");
  }
}
