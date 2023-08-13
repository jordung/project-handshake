import axios from "axios";
import { useState } from "react";

function AddCommsModal({
  projectInformation,
  setProjectInformation,
  userDetails,
}) {
  // state for add communications modal
  const [communicationTitle, setCommunicationTitle] = useState("");
  const [communicationBody, setCommunicationBody] = useState("");

  const handleAddCommunication = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_DB_API}/communications`,
        {
          userId: userDetails.id,
          projectId: projectInformation.id,
          title: communicationTitle,
          description: communicationBody,
        },
        {
          headers: {
            Authorization: `Bearer + ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(async () => {
        const updatedProjectInformation = await axios.get(
          `${process.env.REACT_APP_DB_API}/projects/${projectInformation.id}`,
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

  return (
    <dialog id="addCommunicationsModal" className="modal backdrop-blur-sm">
      <form method="dialog" className="modal-box bg-white">
        <button className="btn btn-sm btn-circle btn-ghost outline-none absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg">Adding New Communications</h3>
        <p className="pt-1 text-sm">
          <span className="font-semibold">{projectInformation.title}</span>
        </p>
        <div className="mt-4">
          <label className="label-text font-medium">Title</label>
          <input
            type="text"
            placeholder="Title of Communication"
            className="input font-normal text-xs mt-1 w-full"
            value={communicationTitle}
            onChange={(e) => setCommunicationTitle(e.target.value)}
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
  );
}

export default AddCommsModal;
