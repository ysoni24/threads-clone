import ProfileHeader from "@/components/profile-header/ProfileHeader";
import ProfileTabs from "@/components/profile-tabs/ProfileTabs";
import { fetchUser } from "@/lib/actions/user.actions";
import { performAuthAndOnboardingCheck } from "@/lib/actions/user.actions";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: PageProps) => {
  await performAuthAndOnboardingCheck();

  const user = await fetchUser(params.id);

  if (!user) return <h1 className="head-text">User not found</h1>;

  return (
    <section>
      <ProfileHeader user={user!} />

      <ProfileTabs user={user!} />
    </section>
  );
};

export default Page;
