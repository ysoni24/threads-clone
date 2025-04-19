import ThreadCard from "@/components/cards/ThreadCard/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";

const Home = async () => {
  const { threads, hasNext } = await fetchThreads({
    pageNumber: 1,
    pageSize: 30,
  });

  return (
    <>
      <section className="">
        {threads.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            <div className="flex flex-col gap-10">
              {threads.map((thread) => (
                <ThreadCard key={thread._id.toString()} thread={thread} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Home;
