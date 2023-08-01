import logo from "../assets/logo/logo-black.png";
import { useNavigate } from "react-router-dom";
import login from "../assets/login/login.svg";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: add in authentication + send information to backend
    // route the user to Volunteer Homepage after authentication
  };

  return (
    <div className="bg-white w-full h-screen flex justify-center items-center md:flex-row md:justify-evenly lg:px-16">
      <div className="flex flex-col justify-center items-center prose min-h-full md:flex-1 md:mx-8">
        <div className="w-3/4 lg:w-full">
          <button
            className="btn btn-outline text-xs btn-sm"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
        <img className="h-40 my-0" src={logo} alt="logo" />
        <h2 className="mt-0 w-3/4 text-center lg:w-full">
          Log in to your account
        </h2>
        <form className="flex flex-col w-3/4 lg:w-full">
          <label className="label-text font-medium mt-4">Email</label>
          <input
            type="text"
            placeholder="billgates@gmail.com"
            className="input font-medium text-sm mt-1"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="label-text font-medium mt-4">Password</label>
          <input
            type="password"
            className="input font-medium text-sm mt-1"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn btn-neutral mt-4 normal-case"
            onClick={handleLogin}
          >
            Log in
          </button>
          <p className="mt-2 mb-0 text-xs text-center font-medium">
            Looking to start the journey of a lifetime?{" "}
            <button
              className="btn btn-link btn-xs normal-case text-xs md:pl-1 font-medium"
              onClick={() => navigate("/signup")}
            >
              Join us now.
            </button>
          </p>
        </form>
      </div>
      <div className="hidden lg:inline-block lg:w-1/2 lg:min-h-full">
        <img className="h-screen object-cover" src={login} alt="signup" />
      </div>
    </div>
  );
}

export default Login;
