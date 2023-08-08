import { useNavigate } from "react-router-dom";
import createProjectImg from "../assets/createproject/createProject.svg";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

function CreateProject() {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  const [pageLoading, setPageLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  // states for user input
  const [targetCommunity, setTargetCommunity] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [volunteersRequired, setVolunteersRequired] = useState(0);
  const [generalInfo, setGeneralInfo] = useState("");
  const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);
  const [countries, setCountries] = useState([]);
  const [projectPictureFile, setProjectPictureFile] = useState(null);

  const [formError, setFormError] = useState(false);

  const STORAGE_KEY = "project/";

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
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
    }
  }, []);

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
    setProjectLocation(event.target.value);
  };

  // when user has typed in location input, show suggestions, else hide suggestions
  useEffect(() => {
    if (
      projectLocation.length > 0 &&
      countries.indexOf(projectLocation) === -1
    ) {
      setShowCountrySuggestions(true);
    } else {
      setShowCountrySuggestions(false);
    }
  }, [projectLocation]);

  // once user has selected location, setUserLocation and hide suggestions
  const handleSelectedCountry = (country) => {
    setProjectLocation(country);
    setShowCountrySuggestions(false);
  };

  // filter list from api with user location input -> outputs location suggestion array
  const matchingCountries = countries.filter((country) =>
    country.toLowerCase().startsWith(projectLocation.toLowerCase())
  );

  const deleteProjectPicture = () => {
    setProjectPictureFile(null);
  };

  // handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // form validation
    if (
      projectPictureFile === "" ||
      targetCommunity === "" ||
      projectTitle === "" ||
      projectLocation === "" ||
      startDate === "" ||
      endDate === "" ||
      volunteersRequired === "" ||
      generalInfo === ""
    ) {
      setFormError(true);

      // set timeout for toast alert to disappear after 3s
      setTimeout(() => {
        setFormError(false);
      }, 3000);
      return;
    }
    setPageLoading(true);
    const storageRefInstance = ref(
      storage,
      STORAGE_KEY + projectPictureFile.name
    );
    uploadBytes(storageRefInstance, projectPictureFile).then((snapshot) => {
      getDownloadURL(storageRefInstance, projectPictureFile.name).then(
        async (url) => {
          console.log(url);
          try {
            const response = await axios.post(
              `${process.env.REACT_APP_DB_API}/projects`,
              {
                imageURL: url,
                targetComm: targetCommunity,
                title: projectTitle,
                location: projectLocation,
                startDate: startDate,
                endDate: endDate,
                volunteersReq: volunteersRequired,
                description: generalInfo,
                userId: userDetails.id,
              }
            );
            console.log(response);
            setProjectPictureFile(null);
            setTargetCommunity("");
            setProjectTitle("");
            setProjectLocation("");
            setStartDate("");
            setEndDate("");
            setVolunteersRequired(0);
            setGeneralInfo("");
            setPageLoading(false);
            navigate("/home");
          } catch (error) {
            console.log(error);
          }
        }
      );
    });
  };

  // page loading is for our own page (+ countries api loading), isLoading is for Auth0 information
  if (pageLoading || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="bg-white w-full h-screen flex justify-center items-start md:flex-row md:justify-evenly lg:px-16">
      <div
        className={`toast toast-top pt-20 toast-end transition-opacity ease-in-out duration-1000 ${
          formError ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="alert alert-error text-white font-medium rounded-lg md:pr-0 text-xs">
          <span>Missing project fields</span>
        </div>
      </div>
      <div className="flex flex-col justify-start pt-20 px-8 items-start prose min-h-full overflow-y-auto md:flex-1 md:mx-8">
        <h2 className="my-0 text-center">Create a New Project</h2>
        <p>Exciting new idea ready to be shipped to the world!</p>
        <form className="flex flex-col w-full">
          <div className="w-full flex flex-col items-start">
            <label className="label-text font-medium mt-2">
              Project Picture
            </label>
            <label htmlFor="image-input" className="cursor-pointer w-full">
              {projectPictureFile ? (
                <div className="mb-1 flex flex-col">
                  <img
                    className="mb-0 mt-1 h-48 w-80 rounded-lg object-cover md:h-[30vh] w-full"
                    src={URL.createObjectURL(projectPictureFile)}
                    alt="user upload"
                  />
                </div>
              ) : (
                <div className="h-48 bg-base-100 rounded-lg mt-1 md:h-[30vh] w-full"></div>
              )}
            </label>
            {projectPictureFile && (
              <button
                type="button"
                className="btn btn-sm btn-outline normal-case font-normal mt-2"
                onClick={deleteProjectPicture}
              >
                Delete
              </button>
            )}
            <input
              id="image-input"
              type="file"
              className="hidden"
              // ref={profilePictureInputRef}
              accept="image/*"
              onChange={(e) => setProjectPictureFile(e.target.files[0])}
            />
          </div>
          <label className="label-text font-medium mt-4">
            Target Community
          </label>
          <select
            className="select mt-1"
            onChange={(e) => setTargetCommunity(e.target.value)}
            value={targetCommunity || ""}
          >
            <option value="" disabled></option>
            <option value="1">Seniors</option>
            <option value="2">Youths</option>
            <option value="3">Animals</option>
            <option value="4">Environment</option>
            <option value="5">People with Disabilities</option>
            <option value="6">Others</option>
          </select>
          <div className="flex flex-col md:w-full">
            <label className="label-text font-medium mt-4">Project Title</label>
            <input
              type="text"
              placeholder="Charity auction for stray dogs in Singapore"
              className="input font-medium text-sm mt-1 truncate"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
          </div>
          <label className="label-text font-medium mt-4">Location</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Singapore"
              className="input font-medium text-sm mt-1 w-full"
              autoComplete="off"
              value={projectLocation}
              onChange={handleLocationChange}
            />
            {matchingCountries.length > 0 && (
              <div className="absolute z-10 bg-white mt-1 w-full max-h-32 overflow-y-scroll">
                {showCountrySuggestions &&
                  matchingCountries.map((country, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm rounded-lg"
                      onClick={() => handleSelectedCountry(country)}
                    >
                      {country}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <label className="label-text font-medium mt-4">Start Date</label>
          <input
            type="datetime-local"
            className="input font-medium text-sm mt-1"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label className="label-text font-medium mt-4">End Date</label>
          <input
            type="datetime-local"
            className="input font-medium text-sm mt-1"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <label className="label-text font-medium mt-4">
            No. of Volunteers Required
          </label>
          <input
            type="number"
            className="input font-medium text-sm mt-1"
            value={volunteersRequired}
            onChange={(e) => setVolunteersRequired(e.target.value)}
          />
          <label className="label-text font-medium mt-4">
            General Information & Description
          </label>
          <textarea
            className="textarea resize-none font-medium text-sm mt-1"
            placeholder="Bio"
            value={generalInfo}
            rows={4}
            onChange={(e) => setGeneralInfo(e.target.value)}
          ></textarea>
          <button
            className="btn btn-neutral mt-4 normal-case"
            onClick={handleSubmit}
          >
            Let's go!
          </button>
          <button
            className="btn btn-outline mt-2 mb-8 normal-case"
            onClick={() => navigate("/home")}
          >
            Cancel
          </button>
        </form>
      </div>
      <div className="hidden xl:inline-block lg:w-1/2 lg:min-h-full">
        <img
          className="h-screen object-cover"
          src={createProjectImg}
          alt="create"
        />
      </div>
    </div>
  );
}

export default CreateProject;
