import { ROUTES } from "@/constants/routes";
import {
  fetchUserActivity,
  performAuthAndOnboardingCheck,
} from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const user = await performAuthAndOnboardingCheck();

  const activity = await fetchUserActivity(user._id.toString());

  console.log("activity", activity);

  return (
    <section>
      <h2 className="head-text mb-10">Activity</h2>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link
                key={activity._id.toString()}
                href={`${ROUTES.home.thread.goto(
                  activity.parentId?.toString() || ""
                )}`}
              >
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt="Profile Picture"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />

                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {activity.author.name}
                    </span>{" "}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </section>
  );
};

export default Page;
