"use client";

import { getSidebarLinks } from "@/constants/links";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import LogoutButton from "./LogoutButton";

const LeftSidebar = () => {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {getSidebarLinks(user?.id as string).map((link) => {
          const isActive = pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive ? "bg-primary-500" : ""}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-10 px-6">
        <LogoutButton />
        <p className="text-light-2 max-lg:hidden">
          Logout
          {/* <span className="text-primary-500">@{user.username}</span> */}
        </p>
      </div>
    </section>
  );
};

export default LeftSidebar;
