import mongoose from "mongoose";

export interface UserPayload {
  _id?: string;
  data: {
    name: string;
    email: string;
  };
}

export interface UserFilter {
  _id?: string | mongoose.Types.ObjectId;
}
