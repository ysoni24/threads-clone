"use server";

import { ROUTES } from "@/constants/routes";
import { IUser, UpdateUserParams } from "../interfaces/user.types";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder, Types } from "mongoose";
import { IThread } from "../interfaces/thread.types";

export async function performAuthAndOnboardingCheck() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) redirectToSignIn();

  const user = await fetchUser(userId as string);

  if (!user?.onboarded) redirect(ROUTES.auth.onboarding);

  return user;
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortOrder = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortOrder?: SortOrder;
}) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: {
        $ne: userId,
      },
      ...(searchString.trim() !== "" && {
        $or: [
          {
            username: {
              $regex: regex,
            },
          },
          {
            name: {
              $regex: regex,
            },
          },
        ],
      }),
    };

    const users = await User.find(query)
      .sort({
        createdAt: sortOrder,
      })
      .skip(skipAmount)
      .limit(pageSize);
    const totalUsersCount = await User.countDocuments(query);
    const hasNextPage = totalUsersCount > skipAmount + users.length;

    return { users, hasNextPage };
  } catch (error: any) {
    console.error("Failed to fetch users: ", error);
    throw new Error("Failed to fetch users");
  }
}

export async function fetchUser(userId: string): Promise<IUser | null> {
  connectToDB();

  try {
    const user = await User.findOne({
      id: userId,
    });

    if (!user) return null;

    return user.toObject();
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function updateUser(
  userId: string,
  { username, name, bio, image, path, onboarded = false }: UpdateUserParams
): Promise<void> {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username?.toLowerCase(),
        name,
        bio,
        image,
        path,
        onboarded,
      },
      {
        upsert: true,
      }
    );

    if (path === ROUTES.home.profile.edit) {
      revalidatePath(path);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

export async function fetchUserThreads(userId: string) {
  connectToDB();

  const userObjectId = new Types.ObjectId(userId);

  try {
    const threads = await User.findById(userObjectId).populate({
      path: "threads",
      model: Thread,
      populate: [
        {
          path: "author",
          model: "User",
          select: "name image id",
        },
        // {
        //   path: "children",
        //   model: "Thread",
        //   populate: {
        //     path: "author",
        //     model: "User",
        //     select: "name image id",
        //   },
        // },
      ],
    });

    if (!threads) return null;

    return threads.threads;
  } catch (error: any) {
    console.error("Failed to fetch user threads: ", error);
  }
}

export async function fetchUserActivity(userId: string) {
  try {
    connectToDB();

    const userObjectId = new Types.ObjectId(userId);

    const userThreads = await Thread.find({
      author: userObjectId,
    });

    const childrenThreads = userThreads.reduce(
      (acc, thread) => [...acc, ...thread.children],
      [] as IThread[]
    );

    const replies = await Thread.find({
      _id: {
        $in: childrenThreads,
      },
      author: {
        $ne: userId,
      },
    }).populate({
      path: "author",
      model: "User",
      select: "name image _id",
    });

    // const activity = [...userThreads, ...replies];

    // return activity;

    return replies;
  } catch (error: any) {
    console.error("Failed to fetch activity: ", error);
    throw new Error("Failed to fetch activity");
  }
}
