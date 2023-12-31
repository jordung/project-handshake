import logo from "../assets/logo/large-logo-black.png";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import { useKBar } from "kbar";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const { query } = useKBar();
  const [pageLoading, setPageLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const getUserDetails = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_DB_API}/users`,
          {
            params: {
              email: user.email,
            },
          }
        );
        return response;
      };
      getUserDetails()
        .then((response) => {
          setUserDetails(response.data.data);
          setPageLoading(false);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            navigate("/setprofile");
          } else {
            console.log(error);
          }
        });
    } else {
      setTimeout(() => {
        setPageLoading(false);
      }, 1000);
    }
  }, []);

  if (pageLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="navbar fixed bg-white z-10">
        <div className="navbar-start">
          <div className="dropdown" tabIndex={0}>
            <label tabIndex={0} className="btn btn-ghost xl:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            {/* mobile/tablet view of quicklinks */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <p onClick={query.toggle}>Search</p>
              </li>
              <li>
                <p onClick={() => navigate("/projects")}>Projects</p>
              </li>
              <li>
                <p onClick={() => navigate("/organisers")}>Organisers</p>
              </li>
              {!isAuthenticated ? (
                <li>
                  <p
                    className="cursor-pointer"
                    onClick={() => loginWithRedirect()}
                  >
                    Log in
                  </p>
                </li>
              ) : (
                <>
                  {userDetails && userDetails.usertypeId !== 1 && (
                    <li>
                      <button className="lg:hidden">
                        <p onClick={() => navigate("/createProject")}>
                          Create New Project
                        </p>
                      </button>
                    </li>
                  )}
                  <li onClick={() => navigate("/profile")}>
                    <div>
                      <img
                        className="h-5 w-5 object-cover rounded-full"
                        src={userDetails && userDetails.profileUrl}
                        alt="profile"
                      />
                      Profile
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="hidden xl:flex">
            {/* desktop view of quicklinks */}
            <ul className="menu menu-horizontal px-1 font-medium gap-4">
              <button
                className="hidden btn btn-ghost btn-sm normal-case xl:h-10 xl:inline-flex"
                onClick={() => navigate("/projects")}
              >
                <p className="text-sm font-medium">Projects</p>
              </button>
              <button
                className="hidden btn btn-ghost btn-sm normal-case xl:h-10 xl:inline-flex"
                onClick={() => navigate("/organisers")}
              >
                <p className="text-sm font-medium">Organisers</p>
              </button>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <button className="btn btn-link">
            <img
              className="h-7 md:h-10 object-contain"
              draggable="false"
              src={logo}
              alt="logo"
              onClick={() => navigate(isAuthenticated ? "/home" : "/")}
            />
          </button>
        </div>
        <div className="navbar-end gap-4">
          {isAuthenticated ? (
            <>
              {userDetails && userDetails.usertypeId !== 1 && (
                <button className="hidden btn btn-primary btn-sm normal-case lg:h-10 lg:inline-flex">
                  <p
                    className="text-sm font-medium"
                    onClick={() => navigate("/createProject")}
                  >
                    Create New Project
                  </p>
                </button>
              )}

              <button
                className="hidden btn btn-ghost btn-sm normal-case xl:h-10 xl:inline-flex"
                onClick={query.toggle}
              >
                <div className="flex gap-[0.1rem]">
                  <kbd className="kbd kbd-sm">⌘ k</kbd>
                </div>
                <p className="text-sm font-medium">Search</p>
              </button>

              <button
                className="hidden btn btn-ghost btn-sm normal-case xl:h-10 xl:inline-flex"
                onClick={() => navigate("/profile")}
              >
                <img
                  className="h-6 w-6 rounded-full object-cover"
                  src={userDetails && userDetails.profileUrl}
                  alt="display"
                />
                <p className="text-sm font-medium">Profile</p>
              </button>

              <button
                className="btn btn-neutral btn-sm normal-case md:h-10"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-ghost btn-sm normal-case hidden font-medium lg:inline-block md:h-10"
                onClick={() => loginWithRedirect()}
              >
                Log in
              </button>
              <button
                className="btn btn-neutral btn-sm normal-case font-medium text-sm md:h-10"
                onClick={() =>
                  loginWithRedirect({
                    authorizationParams: { screen_hint: "signup" },
                  })
                }
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
