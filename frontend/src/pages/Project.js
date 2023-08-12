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
} from "../constants/formatProjectCard";
import {
  FaRegHeart,
  FaHeart,
  FaHeartCircleXmark,
  FaAngleDown,
} from "react-icons/fa6";
import ViewCommsModal from "../components/ViewCommsModal";

function Project() {
  // TODO: refactor this code!
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

  // states for edit project modal
  const [editedTargetComm, setEditedTargetComm] = useState(null);
  const [editedProjectTitle, setEditedProjectTitle] = useState(null);
  const [editedLocation, setEditedLocation] = useState(null);
  const [editedStartDate, setEditedStartDate] = useState(null);
  const [editedEndDate, setEditedEndDate] = useState(null);
  const [editedVolunteersRequired, setEditedVolunteersRequired] =
    useState(null);
  const [editedDescription, setEditedDescription] = useState(null);

  // state for add communications modal
  const [communicationTitle, setCommunicationTitle] = useState("");
  const [communicationBody, setCommunicationBody] = useState("");

  function formatCommDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

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
          setProjectLikes(getProjectInformation.data.data.likesCount);
          setEditedTargetComm(getProjectInformation.data.data.targetCommId);
          setEditedProjectTitle(getProjectInformation.data.data.title);
          setEditedLocation(getProjectInformation.data.data.location);
          setEditedStartDate(getProjectInformation.data.data.startDate);
          setEditedEndDate(getProjectInformation.data.data.endDate);
          setEditedVolunteersRequired(
            getProjectInformation.data.data.volunteersRequired
          );
          setEditedDescription(getProjectInformation.data.data.description);
          setIsJoined(
            getProjectInformation.data.data.registeredVolunteer !== undefined
          );

          console.log(getProjectInformation.data.data);
          setPageLoading(false);
        })
        .then(async () => {
          // retrieve project liked information
          const getProjectLike = async () => {
            const response = await axios.get(
              `${process.env.REACT_APP_DB_API}/likes/${userDetails.id}`
            );
            const likedProjects = response.data.data.map(
              (item) => item.projectId
            );
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
          .post(`${process.env.REACT_APP_DB_API}/register`, {
            userId: userDetails.id,
            projectId: projectInformation.id,
          })
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

  // delete project from delete modal
  const handleDeleteProject = async () => {
    // console.log("Deleting project");
    await axios.delete(
      `${process.env.REACT_APP_DB_API}/projects/${projectInformation.id}`
    );
    navigate("/home");
  };

  // edit project from edit project modal
  const handleEditProject = () => {
    console.log("Editing project");

    const editProject = async () => {
      // send edited information to backend
      await axios
        .put(
          `${process.env.REACT_APP_DB_API}/projects/${projectInformation.id}`,
          {
            targetComm: editedTargetComm,
            title: editedProjectTitle,
            location: editedLocation,
            startDate: editedStartDate,
            endDate: editedEndDate,
            volunteersReq: editedVolunteersRequired,
            description: editedDescription,
            imageURL: projectInformation.image,
          }
        )
        .then((response) => {
          console.log(response);
          // grab new information from backend and set to current state
          setProjectInformation(response.data.data);
          setEditedTargetComm(response.data.data.targetCommId);
          setEditedProjectTitle(response.data.data.title);
          setEditedLocation(response.data.data.location);
          setEditedStartDate(response.data.data.startDate);
          setEditedEndDate(response.data.data.endDate);
          setEditedVolunteersRequired(response.data.data.volunteersRequired);
          setEditedDescription(response.data.data.description);
        });
    };

    editProject();
  };

  const handleResetEditProjectModal = (e) => {
    e.preventDefault();
    setEditedTargetComm(projectInformation.targetCommId);
    setEditedProjectTitle(projectInformation.title);
    setEditedLocation(projectInformation.location);
    setEditedStartDate(projectInformation.startDate);
    setEditedEndDate(projectInformation.endDate);
    setEditedVolunteersRequired(projectInformation.volunteersRequired);
    setEditedDescription(projectInformation.description);
  };

  const handleAddCommunication = async () => {
    const response = await axios
      .post(`${process.env.REACT_APP_DB_API}/communications`, {
        userId: userDetails.id,
        projectId: projectInformation.id,
        title: communicationTitle,
        description: communicationBody,
      })
      .then(async () => {
        const updatedProjectInformation = await axios.get(
          `${process.env.REACT_APP_DB_API}/projects/${projectId}`,
          {
            params: {
              userId: userDetails.id,
            },
          }
        );
        setProjectInformation(updatedProjectInformation.data.data);
      });
    setCommunicationTitle("");
    setCommunicationBody("");
  };

  const handleUpdateVolunteerRole = async (updatedRole, volunteerId) => {
    console.log({
      updatedRole: parseInt(updatedRole),
      volunteerId: volunteerId,
      projectId: projectInformation.id,
    });
    const updatedProjectInformation = await axios.put(
      `${process.env.REACT_APP_DB_API}/admin`,
      {
        updatedRole: updatedRole,
        volunteerId: volunteerId,
        projectId: projectInformation.id,
      }
    );
    setProjectInformation(updatedProjectInformation.data.data);
  };

  const handleUpdateVolunteerStatus = async (updatedStatus, volunteerId) => {
    const updatedProjectInformation = await axios.put(
      `${process.env.REACT_APP_DB_API}/admin`,
      {
        updatedStatus: parseInt(updatedStatus),
        volunteerId: volunteerId,
        projectId: projectInformation.id,
      }
    );
    setProjectInformation(updatedProjectInformation.data.data);
  };

  if (pageLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col pt-20 px-8 w-full mb-10 md:pt-10 lg:pt-20 xl:px-40">
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
              <dialog id="editProjectModal" className="modal backdrop-blur-sm">
                <form method="dialog" className="modal-box bg-white">
                  <button className="btn btn-sm btn-circle btn-ghost outline-none absolute right-2 top-2">
                    ✕
                  </button>
                  <h3 className="font-bold text-lg">Edit Project</h3>
                  <p className="font-semibold text-sm">
                    {projectInformation.title}
                  </p>
                  <div className="w-full px-2 mt-4 max-h-[30vh] md:max-h-[50vh] overflow-y-scroll">
                    <div className="flex flex-col">
                      <label className="label-text font-medium text-sm">
                        Target Community
                      </label>
                      <select
                        className="w-full select mt-1 font-normal text-xs"
                        onChange={(e) => setEditedTargetComm(e.target.value)}
                        // defaultValue={projectInformation.targetCommId}
                        value={editedTargetComm}
                      >
                        <option value="1">Seniors</option>
                        <option value="2">Youths</option>
                        <option value="3">Animals</option>
                        <option value="4">Environment</option>
                        <option value="5">People with Disabilities</option>
                        <option value="6">Others</option>
                      </select>

                      <label className="label-text font-medium mt-4">
                        Project Title
                      </label>
                      <input
                        type="text"
                        // defaultValue={projectInformation.title}
                        className="input font-normal text-xs mt-1 truncate"
                        value={editedProjectTitle}
                        onChange={(e) => setEditedProjectTitle(e.target.value)}
                      />

                      <label className="label-text font-medium mt-4">
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="Singapore"
                        className="input font-normal text-xs mt-1 w-full"
                        autoComplete="off"
                        // defaultValue={projectInformation.location}
                        value={editedLocation}
                        onChange={(e) => setEditedLocation(e.target.value)}
                      />
                      <label className="label-text font-medium mt-4">
                        Start Date
                      </label>
                      <input
                        type="datetime-local"
                        className="input font-normal text-xs mt-1"
                        value={editedStartDate.slice(0, 16)}
                        onChange={(e) => setEditedStartDate(e.target.value)}
                      />
                      <label className="label-text font-medium mt-4">
                        End Date
                      </label>
                      <input
                        type="datetime-local"
                        className="input font-normal text-xs mt-1"
                        value={editedEndDate.slice(0, 16)}
                        onChange={(e) => setEditedEndDate(e.target.value)}
                      />
                      <label className="label-text font-medium mt-4">
                        No. of Volunteers Required
                      </label>
                      <input
                        type="number"
                        className="input font-normal text-xs mt-1"
                        // defaultValue={projectInformation.volunteersRequired}
                        value={editedVolunteersRequired}
                        onChange={(e) =>
                          setEditedVolunteersRequired(e.target.value)
                        }
                      />
                      <label className="label-text font-medium mt-4">
                        General Information & Description
                      </label>
                      <textarea
                        className="textarea resize-none font-normal text-xs my-1"
                        placeholder="Bio"
                        // defaultValue={projectInformation.description}
                        value={editedDescription}
                        rows={6}
                        onChange={(e) => setEditedDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary font-medium text-sm normal-case w-full mt-4"
                    onClick={handleEditProject}
                  >
                    Save changes
                  </button>
                  <button
                    className="btn btn-secondary font-medium text-sm normal-case w-full mt-2"
                    onClick={handleResetEditProjectModal}
                  >
                    Reset Values
                  </button>
                </form>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>

              {/* Delete Modal */}
              <dialog id="deleteModal" className="modal backdrop-blur-sm">
                <form method="dialog" className="modal-box bg-white">
                  <button className="btn btn-sm btn-circle btn-ghost outline-none absolute right-2 top-2">
                    ✕
                  </button>
                  <h3 className="font-bold text-lg">Delete Confirmation</h3>
                  <p className="py-4 text-sm">
                    You're going to delete{" "}
                    <span className="font-semibold">
                      {projectInformation.title}
                    </span>
                    .
                  </p>
                  <p className="text-sm">
                    This will delete the project permanently. You cannot undo
                    this action.
                  </p>
                  <button
                    className="btn btn-error font-medium text-sm normal-case w-full mt-4"
                    onClick={handleDeleteProject}
                  >
                    Yes, delete
                  </button>
                </form>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          )}
        </div>
      </div>
      {/* Volunteer Information Section */}
      {projectInformation.registeredVolunteer && (
        <div className="my-4 w-full">
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Volunteer Information</p>
            <div className="flex gap-8 mt-1 items-center">
              <p className="text-sm">Status</p>
              <span className="badge badge-accent uppercase py-3 text-xs font-semibold text-neutral">
                {getVolunteerStatus(
                  projectInformation.registeredVolunteer.status.id
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Volunteer List Section */}
      {projectInformation.projectVolunteers && (
        <>
          <p className="text-lg font-semibold mt-4">Volunteer List</p>

          <div className="overflow-auto h-96 rounded-xl shadow-xl">
            <table className="table table-xs rounded-xl table-pin-rows">
              <thead className="h-10 rounded-t-xl">
                <tr>
                  <th className="font-normal bg-primary text-white"></th>
                  <th className="font-normal bg-primary text-white">Name</th>
                  <th className="font-normal bg-primary text-white">
                    Phone Number
                  </th>
                  <th className="font-normal bg-primary text-white">
                    Email Address
                  </th>
                  <th className="font-normal bg-primary text-white">Role</th>
                  <th className="font-normal bg-primary text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {projectInformation.projectVolunteers.length > 0 ? (
                  projectInformation.projectVolunteers.map(
                    (volunteer, index) => (
                      <tr key={volunteer.user.id} className="h-10">
                        <th>{index + 1}</th>
                        <td>{volunteer.user.name}</td>
                        <td>{volunteer.user.phone}</td>
                        <td>{volunteer.user.email}</td>
                        {new Date(projectInformation.startDate) < new Date() ? (
                          <td>{getVolunteerRole(volunteer.role.id)}</td>
                        ) : (
                          <td>
                            <select
                              className={`w-30 select select-xs focus:outline-none ${
                                (volunteer.role.id === 2 && "text-sky-800") ||
                                (volunteer.role.id === 3 && "text-warning") ||
                                (volunteer.role.id === 4 && "text-primary")
                              }`}
                              value={volunteer.role.id || "0"}
                              onChange={(e) =>
                                handleUpdateVolunteerRole(
                                  e.target.value,
                                  volunteer.user.id
                                )
                              }
                            >
                              <option value="1">Unassigned</option>
                              <option value="2">Committee</option>
                              <option value="3">Facilitator</option>
                              <option value="4">Participant</option>
                            </select>
                          </td>
                        )}
                        {new Date(projectInformation.startDate) < new Date() ? (
                          <td>{getVolunteerStatus(volunteer.status.id)}</td>
                        ) : (
                          <td>
                            <select
                              className={`w-30 select select-xs focus:outline-none ${
                                (volunteer.status.id === 1 && "text-warning") ||
                                (volunteer.status.id === 2 && "text-primary") ||
                                (volunteer.status.id === 3 && "text-error")
                              }`}
                              value={volunteer.status.id}
                              onChange={(e) =>
                                handleUpdateVolunteerStatus(
                                  e.target.value,
                                  volunteer.user.id
                                )
                              }
                            >
                              <option value="1">Pending</option>
                              <option value="2">Confirmed</option>
                              <option value="3">Rejected</option>
                            </select>
                          </td>
                        )}
                      </tr>
                    )
                  )
                ) : (
                  <tr className="h-10">
                    <th></th>
                    <td colSpan="3" className="text-primary font-medium">
                      There are currently no volunteers!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* General Communications Section */}
      {projectInformation.communications &&
        (projectInformation.userId === userDetails.id ||
          projectInformation.registeredVolunteer.status.name ===
            "Confirmed") && (
          <div className="flex flex-col mt-6 w-full">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">General Communications</p>
              {userDetails.id === projectInformation.user.id && (
                <>
                  <button
                    className="btn btn-neutral btn-sm font-medium text-sm normal-case md:h-10"
                    onClick={() => window.addCommunicationsModal.showModal()}
                    disabled={
                      new Date(projectInformation.startDate) < new Date()
                    }
                  >
                    Add
                  </button>

                  {/* Add Communications Modal */}
                  <dialog
                    id="addCommunicationsModal"
                    className="modal backdrop-blur-sm"
                  >
                    <form method="dialog" className="modal-box bg-white">
                      <button className="btn btn-sm btn-circle btn-ghost outline-none absolute right-2 top-2">
                        ✕
                      </button>
                      <h3 className="font-bold text-lg">
                        Adding New Communications
                      </h3>
                      <p className="pt-1 text-sm">
                        <span className="font-semibold">
                          {projectInformation.title}
                        </span>
                      </p>
                      <div className="mt-4">
                        <label className="label-text font-medium">Title</label>
                        <input
                          type="text"
                          placeholder="Title of Communication"
                          className="input font-normal text-xs mt-1 w-full"
                          value={communicationTitle}
                          onChange={(e) =>
                            setCommunicationTitle(e.target.value)
                          }
                        />
                      </div>
                      <div className="mt-4">
                        <label className="label-text font-medium">Body </label>
                        <textarea
                          className="textarea resize-none font-normal text-xs my-1 w-full"
                          placeholder="General information, instructions, or other news to share to the volunteers!"
                          value={communicationBody}
                          rows={4}
                          onChange={(e) => setCommunicationBody(e.target.value)}
                        ></textarea>
                      </div>

                      <button
                        className="btn btn-primary font-medium text-sm normal-case w-full mt-2"
                        onClick={handleAddCommunication}
                      >
                        Send Communication
                      </button>
                    </form>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </>
              )}
            </div>
            <div className="overflow-auto h-96 mt-2 rounded-xl shadow-xl">
              <table className="table table-xs rounded-xl table-pin-rows">
                <thead className="h-10 rounded-t-xl">
                  <tr>
                    <th className="font-normal bg-primary text-white"></th>
                    <th className="font-normal bg-primary text-white">Title</th>
                    <th className="font-normal bg-primary text-white">
                      Comments
                    </th>
                    <th className="font-normal bg-primary text-white">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {projectInformation.communications.communications.length >
                  0 ? (
                    projectInformation.communications.communications.map(
                      (comm, index) => (
                        <tr
                          key={comm.id}
                          className="h-10 hover:bg-base-100 cursor-pointer transition-all duration-300"
                        >
                          <th>{index + 1}</th>
                          <td>{comm.title}</td>
                          <td>{/* //TODO: dynamic */}3</td>
                          <td>{formatCommDate(comm.createdAt)}</td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr className="h-10">
                      <th></th>
                      <td colSpan="3" className="text-primary font-medium">
                        There are currently no communications!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </div>
  );
}

export default Project;
