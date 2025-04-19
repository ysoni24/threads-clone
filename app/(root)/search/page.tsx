import UserCard from "@/components/cards/user-card/UserCard";
import { Button } from "@/components/ui/button";
import {
  fetchUsers,
  performAuthAndOnboardingCheck,
} from "@/lib/actions/user.actions";
import React from "react";

const Page = async () => {
  const user = await performAuthAndOnboardingCheck();

  const users = await fetchUsers({
    userId: user.id,
  });

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="head-text">Search</h1>
        <div className="flex items-center justify-center gap-2">
          <input
            type="text"
            placeholder="Search"
            className="w-full max-w-md p-2 border border-gray-300 rounded-md"
          />
          <Button className="bg-primary-500">Search</Button>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-9">
        {users.users.length === 0 ? (
          <p className="no-result">No users found</p>
        ) : (
          <>
            {users.users.map((user) => (
              <UserCard key={user._id.toString()} user={user} />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
