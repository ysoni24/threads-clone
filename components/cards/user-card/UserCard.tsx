"use client";

import React from "react";
import { UserCardProps } from "./UserCard.types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const UserCard = ({ user }: UserCardProps) => {
  const router = useRouter();
  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <Image
          src={user.image}
          alt="user_logo"
          width={48}
          height={48}
          className="rounded-full"
        />

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{user.name}</h4>
          <p className="text-small-medium text-gray-1">@{user.username}</p>
        </div>
      </div>

      <Button
        className="user-card_btn"
        onClick={() => router.push(ROUTES.home.profile.goto(user.id))}
      >
        View
      </Button>
    </article>
  );
};

export default UserCard;
