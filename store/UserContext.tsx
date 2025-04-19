"use client";

import { IUser } from "@/lib/interfaces/user.types";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type UserContextType = {
  user: IUser | null;
  setUser: (_user: IUser) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: (_user: IUser) => {},
});

const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);

  const setAuthUser = (_user: IUser) => {
    setUser(_user);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: setAuthUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};

export default UserContextProvider;
