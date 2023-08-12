import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import SetProfile from "./pages/SetProfile";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Spinner from "./components/Spinner";

import {
  getOrganiserTypeDisplay,
  getProjectTargetDisplay,
} from "./utils/formatInformation";

import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
} from "kbar";
import CreateProject from "./pages/CreateProject";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Projects from "./pages/Projects";
import Organisers from "./pages/Organisers";
import Project from "./pages/Project";
import Organiser from "./pages/Organiser";

function App() {
  const { isAuthenticated, logout, loginWithRedirect, user, isLoading } =
    useAuth0();
  const [pageLoading, setPageLoading] = useState(true);
  const [allProjectsList, setAllProjectsList] = useState([]);
  const [allOrganisersList, setAllOrganisersList] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const getProjects = async () => {
      const projects = await axios.get(
        `${process.env.REACT_APP_DB_API}/projects`
      );
      setAllProjectsList(projects.data.data);
    };
    const getOrganisers = async () => {
      const organisers = await axios.get(
        `${process.env.REACT_APP_DB_API}/users/organisers`
      );
      setAllOrganisersList(organisers.data.data);
    };

    getProjects();
    getOrganisers();

    if (isAuthenticated) {
      setPageLoading(false);
    } else {
      setPageLoading(false);
    }
  }, [isAuthenticated, location]);

  const actions = [
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
      id: "aprojects",
      name: "Projects",
      shortcut: ["r"],
      keywords: "project all",
      property: "page",
      section: "Pages",
      perform: () => (window.location.pathname = "projects"),
    },
    {
      id: "aorganisers",
      name: "Organisers",
      shortcut: ["g"],
      keywords: "organise all",
      property: "page",
      section: "Pages",
      perform: () => (window.location.pathname = "organisers"),
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
    {
      id: "bSearchProject",
      name: "Search Projects...",
      keywords: "search project",
      property: "search",
      section: "Search",
    },
    {
      id: "bSearchOrg",
      name: "Search Organisers...",
      keywords: "search project",
      property: "search",
      section: "Search",
    },
    ...allProjectsList.map((project) => ({
      id: `c${project.id.toString()}`,
      name: project.title,
      keywords: project.title,
      property: "page",
      parent: "bSearchProject",
      section: getProjectTargetDisplay(project.targetCommId),
      perform: () => (window.location.pathname = `project/${project.id}`),
    })),
    ...allOrganisersList.map((organiser) => ({
      id: `c${organiser.id.toString()}`,
      name: organiser.name,
      keywords: [...organiser.name, ...organiser.username],
      property: "page",
      parent: "bSearchOrg",
      section: getOrganiserTypeDisplay(organiser.usertypeId),
      perform: () => (window.location.pathname = `organiser/${organiser.id}`),
    })),
  ];

  function RenderResults() {
    const { results } = useMatches();

    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) =>
          typeof item === "string" ? (
            <div className="px-3 py-3 font-medium text-gray-400 text-xs ">
              {item}
            </div>
          ) : (
            <div className="pb-[1px]">
              <div
                className={`${
                  active ? "bg-base-100" : "transparent"
                } px-4 py-2 rounded-lg mx-2 mb-1 flex text-neutral items-center cursor-pointer justify-between text-sm transition-all duration-300`}
              >
                <p>{item.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-[0.6rem] uppercase text-neutral font-normal">
                    {item.property}
                  </p>
                  {item.shortcut && (
                    <kbd
                      className={`kbd kbd-sm transition-all duration-300 ${
                        active
                          ? "bg-neutral text-white"
                          : "bg-secondary text-neutral"
                      }`}
                    >
                      {item.shortcut}
                    </kbd>
                  )}
                </div>
              </div>
            </div>
          )
        }
      />
    );
  }

  if (pageLoading || isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <KBarPositioner className="fixed backdrop-blur-sm flex items-start justify-center w-full inset-0 px-[14vh] py-[16px] box-border z-20">
            <KBarAnimator className="w-full max-w-[600px] overflow-hidden bg-white rounded-xl shadow-lg">
              <KBarSearch className="flex px-4 box-border m-0 w-full h-12 mb-3 border-b-base-100 border-b-[1px] text-sm outline-none" />
              <RenderResults />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
        <Routes>
          {/* Routes with Navbar */}
          <Route element={<Navbar />}>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/organisers" element={<Organisers />} />
            <Route path="/project/:projectId" element={<Project />} />
            <Route path="/organiser/:organiserId" element={<Organiser />} />
          </Route>

          {/* Routes without Navbar */}
          <Route path="/setProfile" element={<SetProfile />} />
          <Route path="/createProject" element={<CreateProject />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </KBarProvider>
    </>
  );
}

export default App;
