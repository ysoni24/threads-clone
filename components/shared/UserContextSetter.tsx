"use client";

import { useUserContext } from "@/store/UserContext";
import { fetchUser } from "@/lib/actions/user.actions";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const UserContextSetter = () => {
  const { user: clerkUser } = useUser();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (!user) {
      const fetchMongoUser = async () => {
        const mongoUser = await fetchUser(clerkUser?.id as string);

        console.log("mongoUser", mongoUser);

        if (mongoUser) {
          setUser(mongoUser);
        }
      };

      fetchMongoUser();
    }
  }, [user, setUser, clerkUser]);

  return null;
};

export default UserContextSetter;
