import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../components/Spinner";
import VolunteerHome from "../components/VolunteerHome";
import { useRegisterActions } from "kbar";
import { createAuthenticatedActions } from "../constants/commandPaletteActions";
import OrganiserHome from "../components/OrganiserHome";

function Home() {
  // TODO: Call API to figure out if user is volunteer/organiser and render out accordingly

  const [pageLoading, setPageLoading] = useState(true);
  const [isVolunteer, setIsVolunteer] = useState(false); // temporary control for volunteer/organiser homepage

  const { isAuthenticated, isLoading, logout } = useAuth0();

  let [dynamicActions] = [];
  if (!isVolunteer) {
    dynamicActions = [
      {
        id: "acreateProject",
        name: "Create New Project",
        shortcut: ["c"],
        keywords: "create project start",
        property: "action",
        section: "Actions",
        perform: () => (window.location.pathname = "createProject"),
      },
      {
        id: "project1",
        name: "Project1",
        keywords: "project",
        property: "page",
        parent: "bSearchProject",
        perform: () => console.log("Project chosen!"),
      },
    ];
  }
  const authenticatedActions = createAuthenticatedActions(
    logout,
    dynamicActions
  );

  useRegisterActions(authenticatedActions);

  useEffect(() => {
    if (isAuthenticated) {
      setPageLoading(false);
    }
  }, [isAuthenticated]);

  if (pageLoading || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex pt-20 justify-center items-center w-screen md:pt-10">
      {isVolunteer ? <VolunteerHome /> : <OrganiserHome />}
    </div>
  );
}

export default Home;
