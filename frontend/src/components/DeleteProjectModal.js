import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeleteProjectModal({ projectInformation }) {
  const navigate = useNavigate();
  // delete project from delete modal
  const handleDeleteProject = async () => {
    // console.log("Deleting project");
    await axios.delete(
      `${process.env.REACT_APP_DB_API}/projects/${projectInformation.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    navigate("/home");
  };

  return (
    <dialog id="deleteModal" className="modal backdrop-blur-sm">
      <form method="dialog" className="modal-box bg-white">
        <button className="btn btn-sm btn-circle btn-ghost outline-none absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg">Delete Confirmation</h3>
        <p className="py-4 text-sm">
          You're going to delete{" "}
          <span className="font-semibold">{projectInformation.title}</span>.
        </p>
        <p className="text-sm">
          This will delete the project permanently. You cannot undo this action.
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
  );
}

export default DeleteProjectModal;
