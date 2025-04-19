import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThreadCardProps } from "./ThreadCard.types";
import { ROUTES } from "@/constants/routes";
import Avatar from "@/components/shared/Avatar";

const ThreadCard = ({ thread, isLastChild }: ThreadCardProps) => {
  const { _id, text, author, community, createdAt, parentId, children } =
    thread;
  const isComment = parentId && children.length === 0;

  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={ROUTES.home.profile.goto(author.id)}>
              <Avatar
                imageUrl={author.image}
                width={48}
                height={48}
                alt="Profile image"
              />
            </Link>

            {!isLastChild && <div className="thread-card_bar" />}
          </div>
          <div className="flex w-full flex-col">
            <Link href={ROUTES.home.profile.goto(author.id)} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{text}</p>

            <div
              className={`${isComment ? "mb-10" : ""} mt-5 flex flex-col gap-3`}
            >
              <div className="flex items-center gap-3.5">
                <Image
                  src="/assets/heart-gray.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Link href={ROUTES.home.thread.goto(_id.toString())}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>

              {isComment && children.length > 0 && (
                <Link href={ROUTES.home.thread.goto(parentId)}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {children.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;
