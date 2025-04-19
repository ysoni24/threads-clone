import AccountProfile from "@/components/forms/AccountProfile/AccountProfile";
import { ROUTES } from "@/constants/routes";
import { fetchUser } from "@/lib/actions/user.actions";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const OnboardingPage = async () => {
  const user = await currentUser();

  if (!user) return null;

  const mongoUser = await fetchUser(user.id);

  if (mongoUser?.onboarded) {
    redirect(ROUTES.home.root);
  }

  const userData = {
    id: mongoUser?._id.toString() || "",
    name: mongoUser?.name || user.fullName || "",
    username: mongoUser?.username || user.username || "",
    bio: mongoUser?.bio || "",
    image: mongoUser?.image || user.imageUrl || "",
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <div className="mt-9 flex flex-col gap-3">
        <h1 className="head-text text-dark-1 dark:text-light-1">Onboarding</h1>
        <p className="text-base-regular text-dark-2 dark:text-light-2">
          Complete your profile now to use Threads
        </p>
      </div>

      <section className="mt-12 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
};

export default OnboardingPage;
