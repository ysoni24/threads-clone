import mongoose from "mongoose";
import { IThread } from "../interfaces/thread.types";

const threadSchema = new mongoose.Schema<IThread>(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    parentId: {
      type: String,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
      },
    ],
  },
  {
    collection: "threads",
    timestamps: true,
  }
);

const Thread: mongoose.Model<IThread> =
  mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
