import { useEffect, useState } from "react";
import Container from "../components/Container";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../components/Spinner";
import VolunteerHome from "../components/VolunteerHome";
import { useRegisterActions } from "kbar";
function Home() {
  // TODO: Call API to figure out if user is volunteer/organiser and render out accordingly

  const [pageLoading, setPageLoading] = useState(true);

  const { isAuthenticated, isLoading, logout } = useAuth0();

  useRegisterActions(
    [
      {
        id: "home",
        name: "Home",
        shortcut: ["h"],
        keywords: "home gohome",
        property: "page",
        perform: () => (window.location.pathname = "home"),
      },
      {
        id: "logout",
        name: "Logout",
        shortcut: ["o"],
        keywords: "log out",
        property: "action",
        perform: () =>
          logout({ logoutParams: { returnTo: window.location.origin } }),
      },
    ],
    [isAuthenticated]
  );

  useEffect(() => {
    if (isAuthenticated) {
      setPageLoading(false);
    }
  }, [isAuthenticated]);

  if (pageLoading || isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <VolunteerHome />
    </Container>
  );
}

export default Home;
