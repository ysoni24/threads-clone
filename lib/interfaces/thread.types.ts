import mongoose from "mongoose";
import { IUser } from "./user.types";

export interface IThread {
  _id: mongoose.Types.ObjectId;
  text: string;
  author: IUser;
  community: null;
  createdAt: Date;
  parentId: string | null;
  children: IThread[];
}

export interface CreateThread {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
  parentId?: string;
  children?: string[];
}

export interface ThreadResponse {
  _id: mongoose.Types.ObjectId;
  text: string;
  author: IUser;
  community: null;
  createdAt: Date;
  parentId: string | null;
  children: IThread[];
}

// export interface ThreadCard {
//   id: string;
//   name: string;
//   image: string;
// }
