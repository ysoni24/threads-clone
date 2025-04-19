import mongoose from "mongoose";
import { IUser } from "../interfaces/user.types";

const userSchema = new mongoose.Schema<IUser>(
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
    threads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
      },
    ],
    onboarded: {
      type: Boolean,
      default: false,
    },
    communities: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Community",
      },
    ],
  },
  {
    collection: "users",
    timestamps: true,
  }
);

// Check if the model already exists before creating a new one
const User: mongoose.Model<IUser> =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
