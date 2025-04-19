import { ROUTES } from "@/constants/routes";
import { SignedIn } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const LogoutButton = () => {
  return (
    <SignedIn>
      <SignOutButton
        signOutOptions={{
          redirectUrl: ROUTES.auth.signIn,
        }}
      >
        <div className="flex cursor-pointer">
          <Image src="/assets/logout.svg" alt="logout" width={24} height={24} />
        </div>
      </SignOutButton>
    </SignedIn>
  );
};

export default LogoutButton;
