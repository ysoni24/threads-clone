import { performAuthAndOnboardingCheck } from "@/lib/actions/user.actions";
import React from "react";

const Page = async () => {
  await performAuthAndOnboardingCheck();

  return <div>Communities</div>;
};

export default Page;
