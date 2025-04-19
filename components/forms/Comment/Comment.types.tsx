import { z } from "zod";
import { commentValidation } from "@/lib/validations";
export type CommentFormValues = z.infer<typeof commentValidation>;

export interface CommentProps {
  parentThreadId: string;
  authorProfileImage: string;
  authorId: string;
}
