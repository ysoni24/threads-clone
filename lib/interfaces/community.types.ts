import mongoose from "mongoose";

export interface ICommunity {
  id: string;
  name: string;
  username: string;
  image: string;
  bio: string;
  createdBy: mongoose.Types.ObjectId;
  threads: mongoose.Types.ObjectId[];
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
