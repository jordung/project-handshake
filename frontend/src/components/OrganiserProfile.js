import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ProfileProjectCard from "../components/ProfileProjectCard";
import Tabs from "../components/Tabs";
import profilePageImg from "../assets/profile/wave.svg";
import {
  FaRegHandPeace,
  FaRegFaceLaughWink,
  FaRegHospital,
  FaCanadianMapleLeaf,
} from "react-icons/fa6";
import axios from "axios";
import {
  formatDateTime,
  getOrganiserTypeDisplay,
} from "../constants/formatProjectCard";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../firebase";

function OrganiserProfile({ userDetails, setUserDetails }) {
  const { isLoading } = useAuth0();
  const [pageLoading, setPageLoading] = useState(true);
  const [organiserInformation, setOrganiserInformation] = useState([]);

  // states for edit profile modal
  const [editedProfilePictureFile, setEditedProfilePictureFile] = useState("");
  const [editedBiography, setEditedBiography] = useState("");
  const [editedUserLocation, setEditedUserLocation] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [editedWebsite, setEditedWebsite] = useState("");

  const STORAGE_KEY = "profile/";

  const deleteProfilePicture = () => {
    setEditedProfilePictureFile(null);
  };

  useEffect(() => {
    const getOrganiserInformation = async () => {
      const orgInfo = await axios.get(
        `${process.env.REACT_APP_DB_API}/organisers/${userDetails.id}`
      );
      // console.log(orgInfo.data.data);
      setOrganiserInformation(orgInfo.data.data);
      // console.log(userDetails);
      setEditedBiography(
        userDetails.biography === null ? "" : userDetails.biography
      );
      setEditedUserLocation(userDetails.location);
      setEditedPhoneNumber(userDetails.phone);
      setEditedWebsite(
        userDetails.organiser.website === null
          ? ""
          : userDetails.organiser.website
      );
      setPageLoading(false);
    };

    getOrganiserInformation();
  }, []);

  const handleResetEditProfileModal = (e) => {
    e.preventDefault();
    setEditedProfilePictureFile("");
    setEditedBiography(
      userDetails.biography === null ? "" : userDetails.biography
    );
    setEditedUserLocation(userDetails.location);
    setEditedPhoneNumber(userDetails.phone);
    setEditedWebsite(
      userDetails.organiser.website === null
        ? ""
        : userDetails.organiser.website
    );
  };

  const handleEditProfile = async () => {
    if (editedProfilePictureFile) {
      setPageLoading(true);
      try {
        const oldProfilePicRef = ref(storage, userDetails.profileUrl);
        deleteObject(oldProfilePicRef);
        console.log("Old profile picture deleted successfully.");
      } catch (error) {
        console.log("Error! Old profile picture not found!");
      }

      const storageRefInstance = ref(
        storage,
        STORAGE_KEY + editedProfilePictureFile.name
      );
      uploadBytes(storageRefInstance, editedProfilePictureFile).then(
        (snapshot) => {
          getDownloadURL(
            storageRefInstance,
            editedProfilePictureFile.name
          ).then(async (url) => {
            console.log(url);
            try {
              const response = await axios.put(
                `${process.env.REACT_APP_DB_API}/users/${userDetails.id}`,
                {
                  phoneNumber: editedPhoneNumber,
                  biography: editedBiography,
                  userLocation: editedUserLocation,
                  profilePicture: url,
                  website: editedWebsite,
                }
              );
              console.log(response);
              setUserDetails(response.data.data);
              setEditedPhoneNumber(response.data.data.phone);
              setEditedBiography(response.data.data.biography);
              setEditedUserLocation(response.data.data.location);
              setEditedProfilePictureFile("");
              setEditedWebsite(response.data.data.organiser.website);
              setPageLoading(false);
            } catch (error) {
              console.log(error);
            }
          });
        }
      );
    } else {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_DB_API}/users/${userDetails.id}`,
          {
            phoneNumber: editedPhoneNumber,
            biography: editedBiography,
            userLocation: editedUserLocation,
            profilePicture: userDetails.profileUrl,
            website: editedWebsite,
          }
        );
        console.log(response);
        setUserDetails(response.data.data);
        setEditedPhoneNumber(response.data.data.phone);
        setEditedBiography(response.data.data.biography);
        setEditedUserLocation(response.data.data.location);
        setEditedProfilePictureFile("");
        setEditedWebsite(response.data.data.organiser.website);
        setPageLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (pageLoading || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full pt-16">
      <img
        className="hidden md:block fixed -z-20 w-screen h-[90vh] bottom-0 object-cover"
        src={profilePageImg}
        alt="background"
      />
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start lg:gap-8">
        <div className="lg:w-1/6 lg:flex-col lg:justify-center lg:items-center">
          <div className="flex flex-col justify-center items-center mt-8 prose md:min-w-full lg:items-center">
            <img
              className="h-48 w-48 object-cover rounded-full shadow-xl mb-2"
              src={userDetails.profileUrl}
              alt="profile"
            />
            <h3 className="my-0 text-center">{userDetails.name}</h3>
            <p className="my-0 font-medium text-center">
              @{userDetails.username}
            </p>
            <button
              className="btn btn-primary btn-sm font-medium text-sm normal-case md:h-10 mt-2"
              onClick={() => window.editProfileModal.showModal()}
            >
              Edit Profile
            </button>
            {/* Edit Profile Modal */}
            <dialog
              id="editProfileModal"
              className="modal backdrop-blur-sm not-prose"
            >
              <form method="dialog" className="modal-box bg-white">
                <button className="btn btn-sm btn-circle btn-ghost outline-none absolute right-2 top-2">
                  ✕
                </button>
                <h3 className="font-bold text-lg text-left">Edit Profile</h3>
                <div className="w-full px-2 mt-4 max-h-[30vh] md:max-h-[50vh] overflow-y-scroll">
                  <div className="flex flex-col">
                    <div className="w-full flex flex-col items-center">
                      <label className="label-text font-medium mt-4">
                        Profile Picture
                      </label>
                      <label htmlFor="image-input" className="cursor-pointer">
                        {editedProfilePictureFile ? (
                          <div className="mb-1 flex flex-col">
                            <img
                              className="mb-0 mt-1 h-32 w-32 rounded-full object-cover"
                              src={URL.createObjectURL(
                                editedProfilePictureFile
                              )}
                              alt="user upload"
                            />
                          </div>
                        ) : (
                          <img
                            className="mb-0 mt-1 h-32 w-32 rounded-full object-cover"
                            src={userDetails.profileUrl}
                            alt="user upload"
                          />
                        )}
                      </label>
                      {editedProfilePictureFile && (
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
                        accept="image/*"
                        onChange={(e) =>
                          setEditedProfilePictureFile(e.target.files[0])
                        }
                      />
                    </div>
                    <label className="label-text font-medium mt-4">
                      Biography
                    </label>
                    <input
                      type="text"
                      className="input font-normal text-xs mt-1 w-full"
                      value={editedBiography}
                      onChange={(e) => setEditedBiography(e.target.value)}
                    />
                    <label className="label-text font-medium mt-4">
                      Location
                    </label>
                    <input
                      type="text"
                      className="input font-normal text-xs mt-1 w-full"
                      value={editedUserLocation}
                      onChange={(e) => setEditedUserLocation(e.target.value)}
                    />
                    <label className="label-text font-medium mt-4">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="input font-normal text-xs mt-1 w-full"
                      value={editedPhoneNumber}
                      onChange={(e) => setEditedPhoneNumber(e.target.value)}
                    />
                    <label className="label-text font-medium mt-4">
                      Website
                    </label>
                    <input
                      type="text"
                      className="input font-normal text-xs my-1 w-full"
                      value={editedWebsite}
                      onChange={(e) => setEditedWebsite(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  className="btn btn-primary font-medium text-sm normal-case w-full mt-4"
                  onClick={handleEditProfile}
                >
                  Save changes
                </button>
                <button
                  className="btn btn-secondary font-medium text-sm normal-case w-full mt-2"
                  onClick={handleResetEditProfileModal}
                >
                  Reset Values
                </button>
              </form>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>

          <div className="mx-8 md:mx-40 lg:mx-0">
            <h6 className="text-lg font-semibold mt-8">Biography</h6>
            <p className="text-sm">
              {userDetails.biography !== null ? userDetails.biography : "NIL"}
            </p>
            <h6 className="text-lg font-semibold mt-8">Location</h6>
            <p className="text-sm">{userDetails.location}</p>
          </div>
        </div>
        <div className="mx-8 md:mx-40 lg:mx-0 lg:w-1/2">
          <h6 className="text-lg font-semibold mt-8">Organiser Information</h6>
          {/* Volunteer Information Card */}
          <div className="shadow-lg p-4 rounded-xl mb-8 bg-white">
            <div>
              <p className="font-semibold">Phone Number</p>
              <p className="text-sm">{userDetails.phone}</p>
            </div>
            <div className="mt-8">
              <p className="font-semibold">Email Address</p>
              <p className="text-sm">{userDetails.email}</p>
            </div>
            <div className="mt-8">
              <p className="font-semibold">Website</p>
              <a
                className="text-sm"
                href={
                  userDetails.organiser.website !== null
                    ? userDetails.organiser.website.startsWith("http")
                      ? userDetails.organiser.website
                      : "http://" + userDetails.organiser.website
                    : null
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {userDetails.organiser.website !== null
                  ? userDetails.organiser.website.startsWith("http")
                    ? userDetails.organiser.website
                    : "http://" + userDetails.organiser.website
                  : "NIL"}
              </a>
            </div>
          </div>
          {/* Stats Component */}
          <div className="stats bg-white shadow max-w-full md:min-w-full md:flex ">
            <div className="stat">
              <div className="stat-title text-xs text-neutral font-medium md:text-center">
                Ongoing <br /> Projects
              </div>
              <div className="stat-value text-2xl flex items-center gap-3 md:justify-center md:text-3xl">
                <span className="text-primary">
                  {organiserInformation.upcomingProjects.length}
                </span>
                <FaRegHandPeace className="h-6 w-6 text-neutral" />
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-xs text-neutral font-medium md:text-center">
                Total <br /> Projects
              </div>
              <div className="stat-value text-2xl flex items-center gap-3 md:justify-center md:text-3xl">
                <span className="text-primary">
                  {organiserInformation.totalProjects}
                </span>
                <FaRegHospital className="h-6 w-6 text-neutral" />
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-xs text-neutral font-medium md:text-center">
                Total <br /> Volunteers
              </div>
              <div className="stat-value text-2xl flex items-center gap-3 md:justify-center md:text-3xl">
                <span className="text-primary">
                  {organiserInformation.totalVolunteers || 0}
                </span>
                <FaRegFaceLaughWink className="h-6 w-6 text-neutral" />
              </div>
            </div>
          </div>
          {/* Upcoming Projects */}
          <h6 className="text-lg font-semibold mt-8">All Projects</h6>
          <div className="shadow-lg p-4 rounded-xl mb-8 bg-white">
            <div className="flex flex-col items-center justify-between mx-1 mt-1">
              <Tabs>
                <Tabs.Tab tabLabel="Upcoming">
                  {organiserInformation.upcomingProjects.length > 0 ? (
                    organiserInformation.upcomingProjects.map((project) => (
                      <ProfileProjectCard
                        key={project.id}
                        projectId={project.id}
                        projectTitle={project.title}
                        projectDate={formatDateTime(
                          project.startDate,
                          project.endDate
                        )}
                        organiserId={project.userId}
                        projectLocation={project.location}
                        organiserImg={project.user.profileUrl}
                        organiserName={project.user.name}
                        organiserType={getOrganiserTypeDisplay(
                          project.user.usertypeId
                        )}
                      />
                    ))
                  ) : (
                    <p className="mt-4 text-sm font-medium text-neutral italic">
                      <FaCanadianMapleLeaf className="h-4 w-4 inline-block text-secondary" />{" "}
                      No upcoming projects found
                    </p>
                  )}
                </Tabs.Tab>
                <Tabs.Tab tabLabel="Past">
                  {organiserInformation.pastProjects.length > 0 ? (
                    organiserInformation.pastProjects.map((project) => (
                      <ProfileProjectCard
                        key={project.id}
                        projectId={project.id}
                        projectTitle={project.title}
                        projectDate={formatDateTime(
                          project.startDate,
                          project.endDate
                        )}
                        organiserId={project.userId}
                        projectLocation={project.location}
                        organiserImg={project.user.profileUrl}
                        organiserName={project.user.name}
                        organiserType={getOrganiserTypeDisplay(
                          project.user.usertypeId
                        )}
                      />
                    ))
                  ) : (
                    <p className="mt-4 text-sm font-medium text-neutral italic">
                      <FaCanadianMapleLeaf className="h-4 w-4 inline-block text-secondary" />{" "}
                      No past projects found
                    </p>
                  )}
                </Tabs.Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganiserProfile;
