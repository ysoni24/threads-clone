import PostThread from "@/components/forms/PostThread/PostThread";
import { performAuthAndOnboardingCheck } from "@/lib/actions/user.actions";
import { Types } from "mongoose";

const Page = async () => {
  const user = await performAuthAndOnboardingCheck();

  return (
    <div className="text-white">
      <h1>Create Thread</h1>

      <PostThread userId={(user._id as Types.ObjectId).toString()} />
    </div>
  );
};

export default Page;
