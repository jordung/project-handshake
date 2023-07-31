import logo from "../assets/logo/large-logo-black.png";

function Navbar() {
  return (
    <div className="navbar fixed bg-white">
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
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Log in</a>
            </li>
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
        <div className="hidden lg:flex">
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
        <img className="h-7 md:h-10 object-contain" src={logo} alt="logo" />
      </div>
      <div className="navbar-end gap-10">
        <button className="btn btn-ghost btn-sm normal-case hidden md:inline-block">
          Log in
        </button>
        <button className="btn btn-neutral btn-sm normal-case">Sign up</button>
      </div>
    </div>
  );
}

export default Navbar;