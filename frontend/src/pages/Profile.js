import { useRegisterActions } from "kbar";
import { useAuth0 } from "@auth0/auth0-react";
import VolunteerProfile from "../components/VolunteerProfile";
import { createAuthenticatedActions } from "../constants/commandPaletteActions";

function Profile() {
  // TODO: organiser profile
  const { logout } = useAuth0();

  // ! if need to create dynamic actions
  //   const projectList = [
  //     { name: "project1" },
  //     { name: "project2" },
  //     { name: "project3" },
  //   ];

  //   const dynamicActions = projectList.map((project) => ({
  //     id: project.name,
  //     name: project.name,
  //     keywords: "project",
  //     property: "page",
  //     perform: () => {
  //       console.log(`Navigating to ${project.name} page`);
  //     },
  //   }));

  useRegisterActions(createAuthenticatedActions(logout));

  return <VolunteerProfile />;
}

export default Profile;
