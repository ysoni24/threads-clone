import mongoose from "mongoose";
import { ICommunity } from "@/lib/interfaces/community.types";

const communitySchema = new mongoose.Schema<ICommunity>(
  {
    id: { type: String, required: true },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    threads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
      },
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    collection: "communities",
    timestamps: true,
  }
);

// Check if the model already exists before creating a new one
const Community: mongoose.Model<ICommunity> =
  mongoose.models.Community || mongoose.model("Community", communitySchema);

export default Community;
