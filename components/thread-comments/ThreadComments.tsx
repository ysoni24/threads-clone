import React from "react";
import { ThreadCommentsProps } from "./ThreadComments.types";
import ThreadCard from "../cards/ThreadCard/ThreadCard";

const ThreadComments = ({ threads }: ThreadCommentsProps) => {
  return (
    <div className="mt-10">
      {threads.map((thread, index) => (
        <ThreadCard
          key={thread._id.toString()}
          thread={thread}
          isLastChild={index === threads.length - 1}
        />
      ))}
    </div>
  );
};

export default ThreadComments;
