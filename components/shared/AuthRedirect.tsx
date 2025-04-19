import { performAuthAndOnboardingCheck } from "@/lib/actions/user.actions";

import React, { PropsWithChildren } from "react";

const AuthRedirect = async ({ children }: PropsWithChildren) => {
  await performAuthAndOnboardingCheck();

  return <>{children}</>;
};

export default AuthRedirect;
