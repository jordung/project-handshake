import logo from "../assets/logo/logo-black.png";
import { useNavigate } from "react-router-dom";
import signup from "../assets/signup/signup.svg";
import { useEffect, useState } from "react";

function Signup() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (confirmPassword !== password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [confirmPassword, password]);

  const handleSignup = (e) => {
    e.preventDefault();

    // TODO: add in authentication + send information to backend
    navigate("/setProfile");
  };

  return (
    <div className="bg-white w-full h-screen flex justify-center items-center md:flex-row md:justify-evenly lg:px-16">
      <div className="hidden lg:inline-block lg:w-1/2 lg:min-h-full">
        <img className="h-screen object-cover" src={signup} alt="signup" />
      </div>
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
          Sign up with a new account
        </h2>
        <form className="flex flex-col w-3/4 lg:w-full">
          <select
            className="select"
            onChange={(e) => setUserType(e.target.value)}
          >
            <option disabled defaultValue>
              Volunteer/Organiser?
            </option>
            <option value="volunteer">Individual (Volunteer)</option>
            <option value="organisation">Organisation (Organiser)</option>
            <option value="team">Self-started Team (Organiser)</option>
          </select>
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
          <label className="label-text font-medium mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            className="input font-medium text-sm mt-1"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="btn btn-neutral mt-4 normal-case"
            onClick={handleSignup}
          >
            Sign up
          </button>
          <p className="mt-2 mb-0 text-xs text-center font-medium">
            Already onboarded with Handshake?
            <button
              className="btn btn-link btn-xs normal-case text-xs md:pl-1 font-medium"
              onClick={() => navigate("/login")}
            >
              Make a difference now.
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
