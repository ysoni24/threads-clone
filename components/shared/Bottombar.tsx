"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { getSidebarLinks } from "@/constants/links";

const Bottombar = () => {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {getSidebarLinks(user?.id as string).map((link) => {
          const isActive = pathname === link.route;
          return (
            <Link
              key={link.label}
              href={link.route}
              className={`bottombar_link ${isActive ? "bg-primary-500" : ""}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Bottombar;
