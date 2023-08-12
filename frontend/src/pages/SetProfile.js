import logo from "../assets/logo/logo-black.png";
import { useNavigate } from "react-router-dom";
import setProfileImg from "../assets/setprofile/setprofile.svg";
import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

function SetProfile() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth0();
  const [pageLoading, setPageLoading] = useState(true);

  // states for user input
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);
  const [countries, setCountries] = useState([]);
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  const [formError, setFormError] = useState(false);

  const STORAGE_KEY = "profile/";

  // clearing states using setProfilePicture(null) doesn't cause the original input's onChange to take place
  // hence it will not clear, and user will not be able to set the profile picture AGAIN after deletion
  // the useRef hook directly access the DOM element, allowing us to manipulate
  const profilePictureInputRef = useRef(null);

  const deleteProfilePicture = () => {
    setProfilePictureFile(null);
    if (profilePictureInputRef.current) {
      profilePictureInputRef.current.value = null;
    }
  };

  // API call on load to get list of countries
  useEffect(() => {
    const getCities = async () => {
      const response = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/iso"
      );
      const countryNames = response.data.data.map((country) => country.name);
      setCountries(countryNames);
      setPageLoading(false);
    };
    getCities();
  }, []);

  // when user types into location input
  const handleLocationChange = (event) => {
    setUserLocation(event.target.value);
  };

  // when user has typed in location input, show suggestions, else hide suggestions
  useEffect(() => {
    if (userLocation.length > 0 && countries.indexOf(userLocation) === -1) {
      setShowCountrySuggestions(true);
    } else {
      setShowCountrySuggestions(false);
    }
  }, [userLocation, countries]);

  // once user has selected location, setUserLocation and hide suggestions
  const handleSelectedCountry = (country) => {
    setUserLocation(country);
    setShowCountrySuggestions(false);
  };

  // filter list from api with user location input -> outputs location suggestion array
  const matchingCountries = countries.filter((country) =>
    country.toLowerCase().startsWith(userLocation.toLowerCase())
  );

  // handle submit form
  const handleSetProfile = async (e) => {
    e.preventDefault();

    // form validation
    if (
      userType === "" ||
      name === "" ||
      username === "" ||
      userLocation === "" ||
      phoneNumber === ""
    ) {
      setFormError(true);

      // set timeout for toast alert to disappear after 3s
      setTimeout(() => {
        setFormError(false);
      }, 3000);
      return;
    }

    let profilePicture = "";

    if (profilePictureFile) {
      setPageLoading(true);
      const storageRefInstance = ref(
        storage,
        STORAGE_KEY + profilePictureFile.name
      );
      uploadBytes(storageRefInstance, profilePictureFile).then((snapshot) => {
        getDownloadURL(storageRefInstance, profilePictureFile.name).then(
          async (url) => {
            console.log(url);
            try {
              const response = await axios.post(
                `${process.env.REACT_APP_DB_API}/users`,
                {
                  userType: userType,
                  name: name,
                  username: username,
                  userLocation: userLocation,
                  phoneNumber: phoneNumber,
                  profilePicture: url,
                  email: user.email,
                }
              );
              console.log(response);
              setUserType("");
              setName("");
              setUsername("");
              setUserLocation("");
              setPhoneNumber("");
              setProfilePictureFile(null);
              setPageLoading(false);

              navigate("/profile");
            } catch (error) {
              console.log(error);
            }
          }
        );
      });
    } else {
      profilePicture = user.picture || "";
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_DB_API}/users`,
          {
            userType: userType,
            name: name,
            username: username,
            userLocation: userLocation,
            phoneNumber: phoneNumber,
            profilePicture: profilePicture,
            email: user.email,
          }
        );
        console.log(response);
        setUserType("");
        setName("");
        setUsername("");
        setUserLocation("");
        setPhoneNumber("");
        setProfilePictureFile(null);
        setPageLoading(false);

        navigate("/profile");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // page loading is for our own page (+ countries api loading), isLoading is for Auth0 information
  if (pageLoading || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="bg-white w-full h-screen flex justify-center items-start md:flex-row md:justify-evenly lg:px-16">
      <div
        className={`toast toast-top toast-end transition-opacity ease-in-out duration-1000 ${
          formError ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="alert alert-error text-white font-medium rounded-lg md:pr-0 text-xs">
          <span>Missing form fields</span>
        </div>
      </div>
      <div className="hidden lg:inline-block lg:w-1/2 lg:min-h-full">
        <img
          className="h-screen object-cover"
          src={setProfileImg}
          alt="signup"
        />
      </div>
      <div className="flex flex-col justify-center items-center prose min-h-full md:flex-1 md:mx-8">
        <img className="h-20 my-0" src={logo} alt="logo" />
        <h2 className="my-0 w-3/4 text-center lg:w-full">
          Set up a new profile
        </h2>
        <form className="flex flex-col w-full">
          <div className="w-full flex flex-col items-center">
            <label className="label-text font-medium mt-4">
              Profile Picture
            </label>
            <label htmlFor="image-input" className="cursor-pointer">
              {profilePictureFile ? (
                <div className="mb-1 flex flex-col">
                  <img
                    className="mb-0 mt-1 h-32 w-32 rounded-full object-cover"
                    src={URL.createObjectURL(profilePictureFile)}
                    alt="user upload"
                  />
                </div>
              ) : user ? (
                <img
                  className="mb-0 mt-1 h-32 w-32 rounded-full object-cover"
                  src={user.picture}
                  alt="user upload"
                />
              ) : (
                <div className="h-32 w-32 bg-gray-300 rounded-full mt-1"></div>
              )}
            </label>
            {profilePictureFile && (
              <button
                type="button"
                className="btn btn-sm btn-outline normal-case font-normal mt-2"
                onClick={deleteProfilePicture}
              >
                Delete
              </button>
            )}
            <input
              id="image-input"
              type="file"
              className="hidden"
              ref={profilePictureInputRef}
              accept="image/*"
              onChange={(e) => setProfilePictureFile(e.target.files[0])}
            />
          </div>
          <label className="label-text font-medium mt-4">
            Are you a volunteer or organiser?
          </label>
          <select
            className="select mt-1 font-normal text-xs"
            onChange={(e) => setUserType(e.target.value)}
            value={userType || ""}
          >
            <option value=""></option>
            <option value="volunteer">Individual (Volunteer)</option>
            <option value="organisation">Organisation (Organiser)</option>
            <option value="team">Self-started Team (Organiser)</option>
          </select>
          <div className="flex flex-col md:w-full">
            <label className="label-text font-medium mt-4">Full Name</label>
            <input
              type="text"
              placeholder="Bill Gates"
              className="input font-normal text-xs mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <label className="label-text font-medium mt-4">Username</label>
          <input
            type="text"
            placeholder="mrGatesBoi"
            className="input font-normal text-xs mt-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className="label-text font-medium mt-4">Location</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Singapore"
              className="input font-normal text-xs mt-1 w-full"
              autoComplete="off"
              value={userLocation}
              onChange={handleLocationChange}
            />
            {matchingCountries.length > 0 && (
              <div className="absolute z-10 bg-white mt-1 w-full max-h-32 overflow-y-scroll">
                {showCountrySuggestions &&
                  matchingCountries.map((country, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-xs rounded-lg"
                      onClick={() => handleSelectedCountry(country)}
                    >
                      {country}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <label className="label-text font-medium mt-4">Phone Number</label>
          <input
            type="text"
            placeholder="+6591234567"
            className="input font-normal text-xs mt-1"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button
            className="btn btn-neutral font-medium text-sm mt-4 mb-8 normal-case"
            onClick={handleSetProfile}
          >
            Update profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetProfile;
