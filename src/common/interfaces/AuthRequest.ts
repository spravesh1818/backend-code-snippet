import User from "../interfaces/User";
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  currentUser?: User; // TODO - remove temporary datatype
  currentApp?: string;
}
