import { PropsWithChildren } from "react";
import UserContextProvider from "@/store/UserContext";
const Providers = ({ children }: PropsWithChildren) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default Providers;
