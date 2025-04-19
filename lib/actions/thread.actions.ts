"use server";

import { revalidatePath } from "next/cache";
import { CreateThread, ThreadResponse } from "../interfaces/thread.types";
import Thread from "../models/thread.model";
import { connectToDB } from "../mongoose";
import { ROUTES } from "@/constants/routes";
import User from "../models/user.model";
import { Types } from "mongoose";

export async function createThread({
  text,
  author,
  communityId,
  path,
  parentId,
  children,
}: CreateThread): Promise<void> {
  try {
    connectToDB();

    const userObjectId = new Types.ObjectId(author);

    const newThread = await Thread.insertOne({
      text,
      author: userObjectId,
      communityId,
      parentId,
      children,
    });

    await User.findByIdAndUpdate(userObjectId, {
      $push: {
        threads: newThread._id,
      },
    });

    if (path === ROUTES.home.createThread) {
      revalidatePath(ROUTES.home.root);
    }
  } catch (error) {
    console.log("[CREATE_THREAD]", error);
    throw new Error("Failed to create thread");
  }
}

export async function fetchThreads({
  pageNumber = 1,
  pageSize = 20,
}: {
  pageNumber?: number;
  pageSize?: number;
}): Promise<{
  threads: ThreadResponse[];
  hasNext: boolean;
}> {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    // const threads = await Thread.find()
    //   .where("parentId")
    //   .in([null, undefined])
    //   .skip(skipAmount)
    //   .limit(pageSize)
    //   .sort({ createdAt: "desc" });

    const threadsQuery = Thread.find({
      parentId: {
        $in: [null, undefined],
      },
    })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({
        createdAt: "desc",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id name image",
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name image",
        },
      });

    const totalThreads = await Thread.countDocuments({
      parentId: {
        $in: [null, undefined],
      },
    });

    const threads = await threadsQuery.exec();

    const hasNext = totalThreads > skipAmount + threads.length;

    return {
      threads,
      hasNext,
    };
  } catch (error) {
    console.log("[FETCH_THREADS]", error);
    throw new Error("Failed to fetch threads");
  }
}

export async function fetchThreadById(id: string) {
  try {
    connectToDB();

    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id name image",
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name image",
        },
      })
      .exec();

    return thread;
  } catch (error) {
    console.log("[FETCH_THREAD_BY_ID]", error);
    throw new Error("Failed to fetch thread");
  }
}

export async function deleteThread(id: string) {
  try {
  } catch (error) {
    console.error("[DELETE_THREAD]", error);
    throw new Error("Failed to delete thread");
  }
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string
) {
  try {
    connectToDB();

    const parentThread = await Thread.findById(threadId);

    if (!parentThread) {
      throw new Error("Thread not found");
    }

    const userObjectId = new Types.ObjectId(userId);

    const newComment = await Thread.insertOne({
      text: commentText,
      author: userObjectId,
      parentId: threadId,
    });

    await parentThread.updateOne({
      $push: {
        children: newComment._id,
      },
    });

    revalidatePath(ROUTES.home.thread.goto(threadId));
  } catch (error) {
    console.error("[ADD_COMMENT_TO_THREAD]", error);
    throw new Error("Failed to add comment to thread");
  }
}
