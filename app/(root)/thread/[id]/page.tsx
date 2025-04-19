import ThreadCard from "@/components/cards/ThreadCard/ThreadCard";
import Comment from "@/components/forms/Comment/Comment";
import ThreadComments from "@/components/thread-comments/ThreadComments";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { performAuthAndOnboardingCheck } from "@/lib/actions/user.actions";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: PageProps) => {
  if (!params.id) return null;

  const currentUser = await performAuthAndOnboardingCheck();

  const thread = await fetchThreadById(params.id);

  if (!thread) return null;

  return (
    <section className="relative">
      <div>
        <ThreadCard thread={thread} />

        <Comment
          parentThreadId={params.id}
          authorProfileImage={currentUser?.image || ""}
          authorId={currentUser?._id.toString() || ""}
        />

        <ThreadComments threads={thread.children} />
      </div>
    </section>
  );
};

export default Page;
