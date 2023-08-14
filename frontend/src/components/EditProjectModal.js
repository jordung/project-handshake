import axios from "axios";
import { useState } from "react";

function EditProjectModal({ projectInformation, setProjectInformation }) {
  const [editedTargetComm, setEditedTargetComm] = useState(
    projectInformation.targetCommId
  );
  const [editedProjectTitle, setEditedProjectTitle] = useState(
    projectInformation.title
  );
  const [editedLocation, setEditedLocation] = useState(
    projectInformation.location
  );
  const [editedStartDate, setEditedStartDate] = useState(
    projectInformation.startDate
  );
  const [editedEndDate, setEditedEndDate] = useState(
    projectInformation.endDate
  );
  const [editedVolunteersRequired, setEditedVolunteersRequired] = useState(
    projectInformation.volunteersRequired
  );
  const [editedDescription, setEditedDescription] = useState(
    projectInformation.description
  );

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
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
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

  return (
    <dialog id="editProjectModal" className="modal backdrop-blur-sm">
      <form method="dialog" className="modal-box bg-white">
        <button className="btn btn-sm btn-circle btn-ghost outline-none absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg">Edit Project</h3>
        <p className="font-semibold text-sm">{projectInformation.title}</p>
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

            <label className="label-text font-medium mt-4">Project Title</label>
            <input
              type="text"
              // defaultValue={projectInformation.title}
              className="input font-normal text-xs mt-1 truncate"
              value={editedProjectTitle}
              onChange={(e) => setEditedProjectTitle(e.target.value)}
            />

            <label className="label-text font-medium mt-4">Location</label>
            <input
              type="text"
              placeholder="Singapore"
              className="input font-normal text-xs mt-1 w-full"
              autoComplete="off"
              // defaultValue={projectInformation.location}
              value={editedLocation}
              onChange={(e) => setEditedLocation(e.target.value)}
            />
            <label className="label-text font-medium mt-4">Start Date</label>
            <input
              type="datetime-local"
              className="input font-normal text-xs mt-1"
              value={editedStartDate.slice(0, 16)}
              onChange={(e) => setEditedStartDate(e.target.value)}
            />
            <label className="label-text font-medium mt-4">End Date</label>
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
              onChange={(e) => setEditedVolunteersRequired(e.target.value)}
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
  );
}

export default EditProjectModal;
