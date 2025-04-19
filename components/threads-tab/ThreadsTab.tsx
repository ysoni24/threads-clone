import React from "react";
import { ThreadsTabProps } from "./ThreadsTab.types";
import { fetchUserThreads } from "@/lib/actions/user.actions";
import ThreadCard from "../cards/ThreadCard/ThreadCard";

const ThreadsTab = async ({ currentUserId }: ThreadsTabProps) => {
  const threads = await fetchUserThreads(currentUserId);

  if (!threads)
    return (
      <section className="mt-9 flex flex-col gap-10">
        <p className="no-result">No threads found</p>
      </section>
    );

  return (
    <section className="mt-9 flex flex-col gap-10">
      {threads.length === 0 ? (
        <p className="no-result">No threads found</p>
      ) : (
        threads.map((thread) => (
          <ThreadCard key={thread._id.toString()} thread={thread} />
        ))
      )}
    </section>
  );
};

export default ThreadsTab;
