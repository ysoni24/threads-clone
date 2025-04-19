import mongoose from "mongoose";
import { IThread } from "./thread.types";

export interface IUser extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  id: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  threads: IThread[];
  onboarded: boolean;
  communities: mongoose.Types.ObjectId[];
}

export interface UpdateUserParams {
  username?: string;
  name?: string;
  image?: string;
  bio?: string;
  path?: string;
  onboarded?: boolean;
}
