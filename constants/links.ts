import { ROUTES } from "./routes";

export const getSidebarLinks = (userId: string) => [
  {
    imgURL: "/assets/home.svg",
    route: ROUTES.home.root,
    label: "Home",
  },
  {
    imgURL: "/assets/search.svg",
    route: ROUTES.home.search,
    label: "Search",
  },
  {
    imgURL: "/assets/heart.svg",
    route: ROUTES.home.activity,
    label: "Activity",
  },
  {
    imgURL: "/assets/create.svg",
    route: ROUTES.home.createThread,
    label: "Create Thread",
  },
  {
    imgURL: "/assets/community.svg",
    route: ROUTES.home.communities,
    label: "Communities",
  },
  {
    imgURL: "/assets/user.svg",
    route: ROUTES.home.profile.goto(userId),
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];
