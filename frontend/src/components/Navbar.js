import logo from "../assets/logo/large-logo-black.png";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import { useKBar } from "kbar";

function Navbar() {
  const navigate = useNavigate();
  const { query } = useKBar();

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div>
      <div className="navbar fixed bg-white z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                <li>
                  <p onClick={query.toggle}>Search</p>
                </li>
              )}

              <li>
                <a>Seek</a>
              </li>
              <li>
                <a>Contribute</a>
              </li>
              <li>
                <a>About</a>
              </li>
              {isAuthenticated && (
                <li>
                  <a>
                    <img
                      className="h-5 w-5 object-cover rounded-full"
                      src={user.picture}
                      alt="profile"
                    />
                    Profile
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="hidden lg:flex">
            {/* desktop view of quicklinks */}
            <ul className="menu menu-horizontal px-1 font-medium">
              <li>
                <a>Seek</a>
              </li>
              <li>
                <a>Contribute</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <button className="btn btn-link">
            <img
              className="h-7 md:h-10 object-contain"
              src={logo}
              alt="logo"
              onClick={() => navigate(isAuthenticated ? "/home" : "/")}
            />
          </button>
        </div>
        <div className="navbar-end gap-4">
          {isAuthenticated ? (
            <>
              <button
                className="hidden btn btn-ghost btn-sm normal-case md:h-10 md:inline-flex"
                onClick={query.toggle}
              >
                <p className="text-sm font-medium">Search</p>
                <div className="flex gap-[0.1rem]">
                  <kbd className="kbd kbd-sm">⌘</kbd>
                  <kbd className="kbd kbd-sm">k</kbd>
                </div>
              </button>

              <button className="hidden btn btn-ghost btn-sm normal-case md:h-10 md:inline-flex">
                <img
                  className="h-6 w-6 rounded-full"
                  src={user.picture}
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
                className="btn btn-ghost btn-sm normal-case hidden lg:inline-block lg:btn-md"
                onClick={() => loginWithRedirect()}
              >
                Log in
              </button>
              <button
                className="btn btn-neutral btn-sm normal-case md:h-10"
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
