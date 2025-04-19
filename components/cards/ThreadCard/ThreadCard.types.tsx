import { IThread } from "@/lib/interfaces/thread.types";
import { IUser } from "@/lib/interfaces/user.types";

export interface ThreadCardProps {
  thread: IThread;
  currentUser?: IUser;
  isLastChild?: boolean;
}
