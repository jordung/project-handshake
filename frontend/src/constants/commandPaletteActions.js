export const createAuthenticatedActions = (logout, dynamicActions = []) =>
  [
    {
      id: "ahome",
      name: "Home",
      shortcut: ["h"],
      keywords: "home gohome",
      property: "page",
      section: "Pages",
      perform: () => (window.location.pathname = "home"),
    },
    {
      id: "aprofile",
      name: "Profile",
      shortcut: ["p"],
      keywords: "profile user",
      property: "page",
      section: "Pages",
      perform: () => (window.location.pathname = "profile"),
    },
    {
      id: "alogout",
      name: "Logout",
      shortcut: ["o"],
      keywords: "log out",
      property: "action",
      section: "Actions",
      perform: () =>
        logout({ logoutParams: { returnTo: window.location.origin } }),
    },
    {
      id: "bSearchProject",
      name: "Search Projects...",
      keywords: "search project",
      property: "search",
      section: "Search",
    },
    ...dynamicActions, // to cater for any dynamic actions (i.e. projects/organisers search)
  ].sort((a, b) => a.id.localeCompare(b.id));

export const createUnauthenticatedActions = (loginWithRedirect) =>
  [
    {
      id: "login",
      name: "Login",
      shortcut: ["i"],
      keywords: "logging in log",
      property: "action",
      perform: () => loginWithRedirect(),
    },
    {
      id: "signup",
      name: "Sign Up",
      shortcut: ["s"],
      keywords: "sign up",
      property: "action",
      perform: () =>
        loginWithRedirect({
          authorizationParams: { screen_hint: "signup" },
        }),
    },
  ].sort((a, b) => a.name.localeCompare(b.name));
