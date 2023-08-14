import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {
  formatDateTime,
  getOrganiserTypeDisplay,
  getVolunteerRole,
  getVolunteerStatus,
} from "../utils/formatInformation";
import {
  FaRegHeart,
  FaHeart,
  FaHeartCircleXmark,
  FaAngleDown,
} from "react-icons/fa6";
import EditProjectModal from "../components/EditProjectModal";
import DeleteProjectModal from "../components/DeleteProjectModal";
import GeneralCommsTable from "../components/GeneralCommsTable";
import VolunteerListTable from "../components/VolunteerListTable";

function Project() {
  // TODO: delete communications modal
  const { projectId } = useParams();
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const [pageLoading, setPageLoading] = useState(true);
  const [projectInformation, setProjectInformation] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [projectLikes, setProjectLikes] = useState();
  const [isJoined, setIsJoined] = useState(false);
  const [updatedRegisteredCount, setUpdatedRegisteredCount] = useState(null);
  const [volunteerInformation, setVolunteerInformation] = useState([]);
  const [generalCommunications, setGeneralCommunications] = useState([]);

  useEffect(() => {
    const getAuthorisedProjectInformation = async () => {
      // retrieve user information with user.email
      await axios
        .get(`${process.env.REACT_APP_DB_API}/users`, {
          params: {
            email: user.email,
          },
        })
        .then(async (userDetails) => {
          //   console.log(userDetails);
          setUserDetails(userDetails.data.data);

          // retrieve project information with userId and projectId
          const getProjectInformation = await axios.get(
            `${process.env.REACT_APP_DB_API}/projects/${projectId}`,
            {
              params: {
                userId: userDetails.data.data.id,
              },
            }
          );
          setProjectInformation(getProjectInformation.data.data);
          setVolunteerInformation(
            getProjectInformation.data.data.projectVolunteers
          );
          setGeneralCommunications(
            getProjectInformation.data.data.communications
          );
          setProjectLikes(getProjectInformation.data.data.likesCount);
          setIsJoined(
            getProjectInformation.data.data.registeredVolunteer !== undefined
          );

          // console.log(getProjectInformation.data.data);
          setPageLoading(false);
        })
        .then(() => {
          // retrieve project liked information
          const getProjectLike = async () => {
            const response = await axios.get(
              `${process.env.REACT_APP_DB_API}/likes/${userDetails.id}`
            );
            const likedProjects = response.data.data.map(
              (item) => item.projectId
            );
            console.log(response.data.data);
            if (likedProjects.indexOf(projectInformation.id) !== -1) {
              setIsLiked(true);
            }
          };
          if (userDetails.usertypeId === 1) {
            getProjectLike();
          }
        });
    };

    const getUnauthorisedProjectInformation = async () => {
      // retrieve project information with userId and projectId
      const getProjectInformation = await axios.get(
        `${process.env.REACT_APP_DB_API}/projects/${projectId}`,
        {
          params: {
            userId: "",
          },
        }
      );
      setProjectInformation(getProjectInformation.data.data);
      setProjectLikes(getProjectInformation.data.data.likesCount);
      setPageLoading(false);
    };

    if (isAuthenticated) {
      getAuthorisedProjectInformation();
    } else {
      getUnauthorisedProjectInformation();
    }
  }, []);

  const handleLike = async () => {
    if (isLiked) {
      // user unlikes the post
      try {
        await axios.delete(`${process.env.REACT_APP_DB_API}/likes`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          data: {
            userId: userDetails.id,
            projectId: projectInformation.id,
          },
        });
        setIsLiked(false);

        const getUpdatedLikesCount = await axios.get(
          `${process.env.REACT_APP_DB_API}/projects/${projectInformation.id}`,
          {
            params: {
              userId: userDetails.id,
            },
          }
        );
        setProjectLikes(getUpdatedLikesCount.data.data.likesCount);
      } catch (error) {
        console.log(error);
      }
    } else {
      // user likes the post
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_DB_API}/likes`,
          {
            userId: userDetails.id,
            projectId: projectInformation.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        // console.log(response);
        setIsLiked(true);

        const getUpdatedLikesCount = await axios.get(
          `${process.env.REACT_APP_DB_API}/projects/${projectInformation.id}`,
          {
            params: {
              userId: userDetails.id,
            },
          }
        );
        // console.log(getUpdatedLikesCount);
        setProjectLikes(getUpdatedLikesCount.data.data.likesCount);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleJoinProject = async () => {
    if (!isJoined) {
      try {
        await axios
          .post(
            `${process.env.REACT_APP_DB_API}/register`,
            {
              userId: userDetails.id,
              projectId: projectInformation.id,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
          .then(async () => {
            setIsJoined(true);
            const getUpdatedRegisteredCount = await axios.get(
              `${process.env.REACT_APP_DB_API}/projects/${projectInformation.id}`,
              {
                params: {
                  userId: userDetails.id,
                },
              }
            );
            setUpdatedRegisteredCount(
              getUpdatedRegisteredCount.data.data.volunteersCount
            );
            setProjectInformation(getUpdatedRegisteredCount.data.data);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios
          .delete(
            `${process.env.REACT_APP_DB_API}/register/${projectInformation.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              data: {
                userId: userDetails.id,
              },
            }
          )
          .then(async () => {
            setIsJoined(false);
            const getUpdatedRegisteredCount = await axios.get(
              `${process.env.REACT_APP_DB_API}/projects/${projectInformation.id}`,
              {
                params: {
                  userId: userDetails.id,
                },
              }
            );
            setUpdatedRegisteredCount(
              getUpdatedRegisteredCount.data.data.volunteersCount
            );
            setProjectInformation(getUpdatedRegisteredCount.data.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (pageLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col pt-20 px-8 w-full mb-10 md:pt-10 lg:pt-20 xl:px-40">
      {/* <div className="text-sm breadcrumbs w-full overflow-x-hidden">
        <ul>
          <li>
            <p
              className="cursor-pointer text-xs"
              onClick={() => navigate("/home")}
            >
              Home
            </p>
          </li>
          <li>
            <p
              className="cursor-pointer text-xs"
              onClick={() => navigate("/projects")}
            >
              Projects
            </p>
          </li>
          <li className="text-xs">{projectInformation.title}</li>
        </ul>
      </div> */}
      <h6 className="text-lg font-semibold text-neutral w-full">
        Project Information
      </h6>
      <div className="flex flex-col justify-center items-center w-full xl:flex-row xl:gap-20 xl:items-start">
        <div className="w-full xl:w-1/2">
          <div>
            <img
              className="rounded-xl lg:w-[50vw]"
              src={projectInformation.image}
              alt="project"
            />
          </div>
        </div>
        <div className="w-full xl:w-1/2">
          <h5 className="text-xl font-semibold text-neutral mt-4 xl:mt-0">
            {projectInformation.title}
          </h5>
          <p className="text-sm mt-1 ">
            {formatDateTime(
              projectInformation.startDate,
              projectInformation.endDate
            )}
          </p>
          <p className="text-sm mt-1">{projectInformation.location}</p>
          <div>
            <div className="flex items-center justify-start gap-10 cursor-pointer mt-4 min-w-full">
              <div
                className="flex items-center gap-2 group"
                onClick={() =>
                  navigate(`/organiser/${projectInformation.userId}`)
                }
              >
                <img
                  className="h-12 w-12 object-cover rounded-full"
                  src={projectInformation.user.profileUrl}
                  alt="profile"
                />
                <div className="flex flex-col items-start">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-all duration-300">
                    {projectInformation.user.name}
                  </p>
                  <div className="bg-neutral py-1 px-2 rounded-md mr-2 group-hover:bg-primary transition-all duration-300">
                    <p className="text-sm uppercase text-white font-semibold">
                      {getOrganiserTypeDisplay(
                        projectInformation.user.usertypeId
                      )}
                    </p>
                  </div>
                </div>
              </div>
              {userDetails.usertypeId === 1 ? (
                <div
                  className="flex items-center gap-1 group cursor-pointer"
                  onClick={handleLike}
                >
                  <span
                    className={`transform ${
                      isLiked
                        ? "text-red-400 scale-110"
                        : "text-neutral group-hover:text-primary scale-100"
                    } transition-all duration-300`}
                  >
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                  </span>
                  <p className="text-xs group-hover:text-primary transition-all duration-300">
                    {projectLikes}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-1 cursor-pointer">
                  <span className="transform text-neutral transition-all duration-300">
                    <FaHeartCircleXmark />
                  </span>
                  <p className="text-xs text-neutral transition-all duration-300">
                    {projectLikes}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center gap-8">
              <p className="text-lg font-semibold">Number of Volunteers</p>
              <p className="text-sm">
                {updatedRegisteredCount || projectInformation.volunteersCount}/
                {projectInformation.volunteersRequired}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <progress
                className="progress progress-primary w-full bg-neutral h-4 p-[0.18rem] lg:h-7 lg:p-1.5"
                value={
                  updatedRegisteredCount || projectInformation.volunteersCount
                }
                max={projectInformation.volunteersRequired}
              ></progress>
              <p className="text-xs font-semibold text-neutral xl:text-sm">
                {Math.floor(
                  ((updatedRegisteredCount ||
                    projectInformation.volunteersCount) /
                    projectInformation.volunteersRequired) *
                    100
                )}
                %
              </p>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center gap-8">
              <p className="text-lg font-semibold">Target Community</p>
              <span className="badge badge-accent uppercase py-3 text-xs font-semibold text-neutral">
                {projectInformation.target_comm.name}
              </span>
            </div>
          </div>
          <div className="mt-6 flex flex-col">
            <p className="text-lg font-semibold">Project Description</p>
            {projectInformation.description
              .split("\n")
              .map((paragraph, index) => (
                <p key={index} className="text-sm mb-2">
                  {paragraph}
                </p>
              ))}
          </div>

          {/* 4 cases here: 
          1. User is unauthorised - button is hidden
          2. User is authorised & unregistered - "Make a positive impact" is rendered
          3. User is authorised & registered - "Joined" is rendered
          4. User is authorised & unregisterd & project is filled - "Project has been filled" is rendered
          */}
          {userDetails.usertypeId && userDetails.usertypeId === 1 && (
            <div className="my-6 flex justify-start w-full">
              {projectInformation.volunteersCount /
                projectInformation.volunteersRequired ===
                1 && projectInformation.registeredVolunteer === undefined ? (
                <button
                  className="btn font-normal text-sm normal-case w-full md:w-64 btn-primary"
                  disabled
                  onClick={handleJoinProject}
                >
                  Project has been filled
                </button>
              ) : (
                <button
                  className={`btn font-normal text-sm normal-case w-full md:w-64 ${
                    isJoined
                      ? "btn-ghost border-primary text-primary"
                      : "btn-primary"
                  }`}
                  disabled={new Date(projectInformation.startDate) < new Date()}
                  onClick={handleJoinProject}
                >
                  {new Date(projectInformation.startDate) < new Date()
                    ? "Past project"
                    : isJoined
                    ? "Joined"
                    : "Make a positive impact!"}
                </button>
              )}
            </div>
          )}
          {userDetails.id === projectInformation.user.id && (
            <div className="md:flex md:items-center md:gap-2">
              <div className="dropdown w-full md:w-72">
                <summary
                  tabIndex={0}
                  className="btn mt-4 font-medium text-sm normal-case w-full md:w-72 btn-neutral"
                  disabled={new Date(projectInformation.startDate) < new Date()}
                >
                  {new Date(projectInformation.startDate) < new Date()
                    ? "Past project"
                    : "Project settings"}
                  <span className="absolute right-5">
                    <FaAngleDown />
                  </span>
                </summary>
                <ul className="shadow-lg menu mt-1 dropdown-content z-[9] bg-base-100 rounded-lg p-0 w-full">
                  <button
                    className="btn font-medium text-sm normal-case w-full md:w-72 rounded-b-none btn-ghost text-neutral"
                    onClick={() => window.editProjectModal.showModal()}
                  >
                    Edit Project
                  </button>
                  <button
                    className="btn font-medium text-sm normal-case w-full md:w-72 rounded-t-none btn-ghost text-error outline-none"
                    onClick={() => window.deleteModal.showModal()}
                  >
                    Delete Project
                  </button>
                </ul>
              </div>

              {/* Edit Project Modal */}
              <EditProjectModal
                projectInformation={projectInformation}
                setProjectInformation={setProjectInformation}
              />

              {/* Delete Modal */}
              <DeleteProjectModal projectInformation={projectInformation} />
            </div>
          )}
        </div>
      </div>
      {/* Volunteer Information Section - for registered volunteers */}
      {projectInformation.registeredVolunteer && (
        <div className="my-4 w-full">
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Volunteer Information</p>
            <div className="flex flex-col">
              <div className="flex gap-8 mt-1 items-center">
                <p className="text-sm w-12">Status</p>
                <span
                  className={`badge uppercase py-3 text-xs font-semibold ${
                    (projectInformation.registeredVolunteer.status.id === 1 &&
                      "badge-warning") ||
                    (projectInformation.registeredVolunteer.status.id === 2 &&
                      "badge-primary") ||
                    (projectInformation.registeredVolunteer.status.id === 3 &&
                      "badge-error")
                  }`}
                >
                  {getVolunteerStatus(
                    projectInformation.registeredVolunteer.status.id
                  )}
                </span>
              </div>
              {projectInformation.registeredVolunteer.status.id !== 3 && (
                <div className="flex gap-8 mt-1 items-center">
                  <p className="text-sm w-12">Role</p>
                  <span
                    className={`badge uppercase py-3 text-xs font-semibold ${
                      (projectInformation.registeredVolunteer.role.id === 1 &&
                        "badge-neutral") ||
                      (projectInformation.registeredVolunteer.role.id === 2 &&
                        "badge-info") ||
                      (projectInformation.registeredVolunteer.role.id === 3 &&
                        "badge-warning") ||
                      (projectInformation.registeredVolunteer.role.id === 4 &&
                        "badge-primary")
                    }`}
                  >
                    {getVolunteerRole(
                      projectInformation.registeredVolunteer.role.id
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Volunteer List Section - for project organiser */}
      {volunteerInformation && (
        <VolunteerListTable
          projectInformation={projectInformation}
          volunteerInformation={volunteerInformation}
          setVolunteerInformation={setVolunteerInformation}
        />
      )}

      {/* General Communications Section - for registered volunteer & project organiser */}
      {generalCommunications &&
        (projectInformation.userId === userDetails.id ||
          projectInformation.registeredVolunteer.status.id === 2) && (
          <GeneralCommsTable
            userDetails={userDetails}
            projectInformation={projectInformation}
            generalCommunications={generalCommunications}
            setGeneralCommunications={setGeneralCommunications}
          />
        )}
    </div>
  );
}

export default Project;
