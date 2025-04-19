import Image from "next/image";
import { ProfileHeaderProps } from "./ProfileHeader.types";

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={user.image}
              alt="Profile Image"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {user.name}
            </h2>
            <p className="text-base-medium text-gray-1">@{user.username}</p>
          </div>
        </div>

        {/* <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src="/assets/edit.svg"
                alt="Edit"
                fill
                className="cursor-pointer object-contain"
              />
            </div>
          </div>
        </div> */}
      </div>

      <p className="mt-6 max-w-lg text-light-2">{user.bio}</p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
