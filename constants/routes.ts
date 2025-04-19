export const ROUTES = {
  home: {
    root: "/",
    profile: {
      root: "/profile",
      edit: "/profile/edit",
      goto: (id: string) => `/profile/${id}`,
    },
    thread: {
      root: "/thread",
      goto: (id: string) => `/thread/${id}`,
    },
    search: "/search",
    activity: "/activity",
    createThread: "/create-thread",
    communities: "/communities",
  },
  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
    onboarding: "/onboarding",
  },
};
