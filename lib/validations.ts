import { z } from "zod";

export const userValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(30),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(30),
  bio: z
    .string()
    .min(3, { message: "Bio must be at least 3 characters." })
    .max(1000),
});

export const threadValidation = z.object({
  thread: z
    .string()
    .min(3, { message: "Thread must be at least 3 characters." })
    .max(1000),
});

export const commentValidation = z.object({
  commentText: z.string().max(1000),
});
