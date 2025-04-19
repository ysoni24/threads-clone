import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { profileTabs } from "@/constants/links";
import Image from "next/image";
import { IUser } from "@/lib/interfaces/user.types";
import ThreadsTab from "../threads-tab/ThreadsTab";

interface ProfileTabsProps {
  user: IUser;
}

const ProfileTabs = ({ user }: ProfileTabsProps) => {
  return (
    <div>
      <Tabs defaultValue="threads" className="w-full">
        <TabsList className="tab">
          {profileTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="tab">
              <Image
                src={tab.icon}
                alt={tab.label}
                width={24}
                height={24}
                className="object-contain"
              />
              <p className="max-sm:hidden">{tab.label}</p>

              {tab.value === "threads" && (
                <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                  {user.threads.length}
                </p>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {profileTabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="w-full text-light-1"
          >
            {tab.value === "threads" && (
              <ThreadsTab
                currentUserId={user._id.toString()}
                accountType="User"
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
