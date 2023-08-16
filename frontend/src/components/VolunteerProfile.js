import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ProfileProjectCard from "../components/ProfileProjectCard";
import Tabs from "../components/Tabs";
import profilePageImg from "../assets/profile/wave.svg";
import axios from "axios";
import {
  formatDateTime,
  getOrganiserTypeDisplay,
  getProjectTargetDisplay,
} from "../utils/formatInformation";
import { storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { FaCanadianMapleLeaf, FaAngleDown } from "react-icons/fa6";

function VolunteerProfile({ userDetails, setUserDetails }) {
  const { isAuthenticated, isLoading, logout } = useAuth0();
  const [pageLoading, setPageLoading] = useState(true);
  const [totalHoursClocked, setTotalHoursClocked] = useState(0);
  const [latestProjects, setLatestProjects] = useState([]);
  const [upcomingProjects, setUpcomingProjects] = useState([]);
  const [likedProjects, setLikedProjects] = useState([]);

  // states for edit profile modal
  const [editedProfilePictureFile, setEditedProfilePictureFile] = useState("");
  const [editedBiography, setEditedBiography] = useState("");
  const [editedUserLocation, setEditedUserLocation] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [editedTargetComm, setEditedTargetComm] = useState("");

  const STORAGE_KEY = "profile/";

  const deleteProfilePicture = () => {
    setEditedProfilePictureFile(null);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const getVolunteerInformation = async () => {
        const volunteerInfo = await axios.get(
          `${process.env.REACT_APP_DB_API}/volunteers/${userDetails.id}`
        );
        // console.log(volunteerInfo.data.data);
        const volunteerLikedProjects = await axios.get(
          `${process.env.REACT_APP_DB_API}/likes/${userDetails.id}`
        );
        // console.log(volunteerLikedProjects.data.data);
        Promise.all([
          volunteerInfo.data.data,
          volunteerLikedProjects.data.data,
        ]).then((values) => {
          setTotalHoursClocked(values[0].totalHoursClocked);
          setLatestProjects(values[0].latestProjects);
          setUpcomingProjects(values[0].upcomingProjects);
          setLikedProjects(values[1]);
          setEditedBiography(
            userDetails.biography === null ? "" : userDetails.biography
          );
          setEditedUserLocation(userDetails.location);
          setEditedPhoneNumber(userDetails.phone);
          setEditedTargetComm(userDetails.volunteer.targetCommId);
          setPageLoading(false);
        });
      };
      getVolunteerInformation();
    }
  }, [isAuthenticated]);

  const handleResetEditProfileModal = (e) => {
    e.preventDefault();
    setEditedProfilePictureFile("");
    setEditedBiography(
      userDetails.biography === null ? "" : userDetails.biography
    );
    setEditedUserLocation(userDetails.location);
    setEditedPhoneNumber(userDetails.phone);
    setEditedTargetComm(userDetails.volunteer.targetCommId);
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
            // console.log(url);
            try {
              const response = await axios.put(
                `${process.env.REACT_APP_DB_API}/users/${userDetails.id}`,
                {
                  phoneNumber: editedPhoneNumber,
                  biography: editedBiography,
                  userLocation: editedUserLocation,
                  profilePicture: url,
                  targetComm: editedTargetComm,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                }
              );
              // console.log(response);
              setUserDetails(response.data.data);
              setEditedPhoneNumber(response.data.data.phone);
              setEditedBiography(response.data.data.biography);
              setEditedUserLocation(response.data.data.location);
              setEditedProfilePictureFile("");
              setEditedTargetComm(response.data.data.volunteer.targetCommId);
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
            targetComm: editedTargetComm,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        // console.log(response);
        setUserDetails(response.data.data);
        setEditedPhoneNumber(response.data.data.phone);
        setEditedBiography(response.data.data.biography);
        setEditedUserLocation(response.data.data.location);
        setEditedProfilePictureFile("");
        setEditedTargetComm(response.data.data.volunteer.targetCommId);
        setPageLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteAccount = async () => {
    await axios.delete(
      `${process.env.REACT_APP_DB_API}/users/${userDetails.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (pageLoading || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full pt-16 lg:mb-16">
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
            <h3 className="my-0">{userDetails.name}</h3>
            <p className="my-0 font-medium">@{userDetails.username}</p>
            <div className="dropdown w-1/2 lg:w-full">
              <summary
                tabIndex={0}
                className="btn mt-4 font-medium text-sm normal-case w-full md:w-full btn-neutral"
              >
                User Settings
                <span className="absolute right-5">
                  <FaAngleDown />
                </span>
              </summary>
              <ul className="shadow-lg menu mt-1 dropdown-content z-[9] bg-base-100 rounded-lg p-0 w-full">
                <button
                  className="btn font-medium text-sm normal-case w-full rounded-b-none btn-ghost text-neutral"
                  onClick={() => window.editProfileModal.showModal()}
                >
                  Edit Profile
                </button>
                <button
                  className="btn font-medium text-sm normal-case w-full rounded-t-none btn-ghost text-error outline-none"
                  onClick={() => window.deleteUserModal.showModal()}
                >
                  Delete Account
                </button>
              </ul>
            </div>

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
                      Target Community
                    </label>
                    <select
                      className="select my-1 font-normal text-xs"
                      onChange={(e) => setEditedTargetComm(e.target.value)}
                      value={editedTargetComm || ""}
                    >
                      <option value="" disabled></option>
                      <option value="1">Seniors</option>
                      <option value="2">Youths</option>
                      <option value="3">Animals</option>
                      <option value="4">Environment</option>
                      <option value="5">People with Disabilities</option>
                      <option value="6">Others</option>
                    </select>
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

            {/* Delete User Modal */}
            <dialog id="deleteUserModal" className="modal backdrop-blur-sm">
              <form method="dialog" className="modal-box bg-white">
                <button className="btn btn-sm btn-circle btn-ghost outline-none absolute right-2 top-2">
                  ✕
                </button>
                <h3 className="font-bold text-lg">Delete Confirmation</h3>
                <p className="py-4 text-sm">
                  You're going to delete{" "}
                  <span className="font-semibold">{userDetails.name}</span>.
                </p>
                <p className="text-sm">
                  This will delete the project permanently. You cannot undo this
                  action.
                </p>
                <button
                  className="btn btn-error font-medium text-sm normal-case w-full mt-4"
                  onClick={handleDeleteAccount}
                >
                  Yes, delete
                </button>
              </form>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
          <div className="mx-8 md:mx-40 lg:mx-0">
            <h6 className="text-lg font-semibold mt-6">Biography</h6>
            <p className="text-sm">
              {userDetails.biography !== null ? userDetails.biography : "NIL"}
            </p>
            <h6 className="text-lg font-semibold mt-4">Location</h6>
            <p className="text-sm">{userDetails.location}</p>
          </div>
        </div>
        <div className="mx-8 md:mx-40 lg:mx-0 lg:w-1/2">
          <h6 className="text-lg font-semibold mt-8">Volunteer Information</h6>
          {/* Volunteer Information Card */}
          <div className="shadow-lg p-4 rounded-xl mb-8 bg-white">
            <div className="md:flex md:gap-40 ">
              <div>
                <p className="font-semibold">Email Address</p>
                <p className="text-sm">{userDetails.email}</p>
              </div>
              <div>
                <p className="font-semibold mt-8 md:mt-0">Phone Number</p>
                <p className="text-sm">{userDetails.phone}</p>
              </div>
            </div>

            <div>
              <p className="font-semibold mt-8">Interests</p>
              <p className="text-sm">
                <span className="badge badge-accent uppercase py-3 text-xs font-semibold text-neutral">
                  {userDetails.volunteer.targetCommId !== null
                    ? getProjectTargetDisplay(
                        userDetails.volunteer.targetCommId
                      )
                    : "NIL"}
                </span>
              </p>
            </div>
            <div>
              <p className="font-semibold mt-8">Number of Hours Clocked</p>
              <p className="text-sm">{totalHoursClocked}</p>
            </div>
            <div className="mt-8">
              <p className="font-semibold mt-8">Latest Projects Joined</p>
              <div className="flex flex-col items-center justify-between mx-1 mt-1  xl:max-h-[180px] xl:overflow-y-scroll">
                {/* Profile Project Card */}
                {latestProjects.length > 0 ? (
                  latestProjects.map((project) => (
                    <ProfileProjectCard
                      key={project.project.id}
                      projectId={project.project.id}
                      projectTitle={project.project.title}
                      projectDate={formatDateTime(
                        project.project.startDate,
                        project.project.endDate
                      )}
                      projectLocation={project.project.location}
                      organiserId={project.project.user.id}
                      organiserImg={project.project.user.profileUrl}
                      organiserName={project.project.user.name}
                      organiserType={getOrganiserTypeDisplay(
                        project.project.user.usertypeId
                      )}
                    />
                  ))
                ) : (
                  <p className="mt-2 text-sm font-medium text-neutral italic min-w-full">
                    <FaCanadianMapleLeaf className="h-4 w-4 inline-block text-secondary" />{" "}
                    Join a project now!
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Upcoming Projects */}
          <h6 className="text-lg font-semibold mt-8">
            Upcoming/Saved Projects
          </h6>
          <div className="shadow-lg p-4 rounded-xl mb-8 bg-white">
            <div className="flex flex-col items-center justify-between mx-1 mt-1">
              <Tabs>
                <Tabs.Tab tabLabel="Upcoming">
                  {upcomingProjects.length > 0 ? (
                    upcomingProjects.map((project) => (
                      <ProfileProjectCard
                        key={project.project.id}
                        projectId={project.project.id}
                        projectTitle={project.project.title}
                        projectDate={formatDateTime(
                          project.project.startDate,
                          project.project.endDate
                        )}
                        projectLocation={project.project.location}
                        organiserId={project.project.user.id}
                        organiserImg={project.project.user.profileUrl}
                        organiserName={project.project.user.name}
                        organiserType={getOrganiserTypeDisplay(
                          project.project.user.usertypeId
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
                <Tabs.Tab tabLabel="Saved">
                  {likedProjects.length > 0 ? (
                    likedProjects.map((project) => (
                      <ProfileProjectCard
                        key={project.projectId}
                        projectId={project.projectId}
                        projectTitle={project.project.title}
                        projectDate={formatDateTime(
                          project.project.startDate,
                          project.project.endDate
                        )}
                        organiserId={project.project.user.id}
                        projectLocation={project.project.location}
                        organiserImg={project.project.user.profileUrl}
                        organiserName={project.project.user.name}
                        organiserType={getOrganiserTypeDisplay(
                          project.project.user.usertypeId
                        )}
                      />
                    ))
                  ) : (
                    <p className="mt-4 text-sm font-medium text-neutral italic">
                      <FaCanadianMapleLeaf className="h-4 w-4 inline-block text-secondary" />{" "}
                      No saved projects found
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

export default VolunteerProfile;
