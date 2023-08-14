import { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import axios from "axios";

function ViewCommsModal({
  selectedComms,
  projectInformation,
  userDetails,
  setGeneralCommunications,
}) {
  const [commsInfo, setCommsInfo] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  const [commentText, setCommentText] = useState("");
  console.log(projectInformation);
  console.log(userDetails);
  useEffect(() => {
    const getComm = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_DB_API}/communications`,
          {
            params: {
              projectId: selectedComms.projectId,
              commsId: selectedComms.commsId,
            },
          }
        );
        // console.log(response.data.data);
        setCommsInfo(response.data.data);
        setCommentsList(response.data.data.comments);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedComms) {
      getComm();
    }
  }, [selectedComms]);

  function formatCommDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  const handleDeleteComms = async () => {
    try {
      const updatedCommsList = await axios.delete(
        `${process.env.REACT_APP_DB_API}/communications`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          data: {
            userId: selectedComms.userId,
            commsId: selectedComms.commsId,
            projectId: projectInformation.id,
          },
        }
      );

      setGeneralCommunications(updatedCommsList.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    const sendComment = async () => {
      const updatedCommentsList = await axios.post(
        `${process.env.REACT_APP_DB_API}/comments`,
        {
          userId: selectedComms.userId,
          projectId: selectedComms.projectId,
          commsId: selectedComms.commsId,
          text: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // console.log(updatedCommentsList);
      setCommentsList(updatedCommentsList.data.data);
    };

    const getUpdatedProjectInformation = async () => {
      try {
        const getProjectInformation = await axios.get(
          `${process.env.REACT_APP_DB_API}/projects/${selectedComms.projectId}`,
          {
            params: {
              userId: selectedComms.userId,
            },
          }
        );
        // console.log(getProjectInformation.data.data);
        setGeneralCommunications(
          getProjectInformation.data.data.communications
        );
        setCommentText("");
      } catch (error) {
        console.log(error);
      }
    };

    sendComment().then(() => getUpdatedProjectInformation());
  };

  const handleDeleteComment = (commentId) => {
    const deleteComment = async () => {
      try {
        const updatedCommentsList = await axios.delete(
          `${process.env.REACT_APP_DB_API}/comments`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            data: {
              userId: selectedComms.userId,
              commsId: selectedComms.commsId,
              commentId: commentId,
            },
          }
        );
        // console.log(updatedCommentsList.data.data);
        setCommentsList(updatedCommentsList.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getUpdatedProjectInformation = async () => {
      try {
        const getProjectInformation = await axios.get(
          `${process.env.REACT_APP_DB_API}/projects/${selectedComms.projectId}`,
          {
            params: {
              userId: selectedComms.userId,
            },
          }
        );
        // console.log(getProjectInformation.data.data);
        setGeneralCommunications(
          getProjectInformation.data.data.communications
        );
      } catch (error) {
        console.log(error);
      }
    };

    deleteComment().then(() => getUpdatedProjectInformation());
  };

  return (
    <dialog id="viewCommsModal" className="modal backdrop-blur-sm not-prose">
      <form method="dialog" className="modal-box bg-white w-11/12 max-w-5xl">
        <button className="btn btn-sm btn-circle btn-ghost outline-none absolute right-2 top-2">
          ✕
        </button>
        <div className="flex flex-col">
          <div>
            <h3 className="font-bold text-lg text-left">{commsInfo.title}</h3>
            <p className="font-semibold text-sm">
              {commsInfo.createdAt && formatCommDate(commsInfo.createdAt)}
            </p>
            <div className="w-full mt-1 max-h-[30vh] md:max-h-[30vh] overflow-y-auto">
              <div className="flex flex-col">
                <div className="font-normal text-sm">
                  {commsInfo.description &&
                    commsInfo.description
                      .split("\n")
                      .map((paragraph, index) => (
                        <p key={index} className="text-sm mb-2">
                          {paragraph}
                        </p>
                      ))}
                </div>
              </div>
            </div>
          </div>
          {projectInformation.userId === userDetails.id && (
            <div className="flex-shrink-0">
              <button
                className="btn btn-error text-xs font-medium normal-case btn-sm md:h-10"
                onClick={handleDeleteComms}
              >
                Delete Communication
              </button>
            </div>
          )}
        </div>
        <div>
          <h4 className="font-bold text-lg mt-4">Comments</h4>
          <div className="h-56 shadow-lg max-h-[30vh] overflow-auto rounded-xl">
            {commentsList.length > 0 &&
              commentsList
                .sort((a, b) => a.id - b.id)
                .map((comment) => (
                  <div
                    key={comment.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-start mx-2 my-1 py-1">
                      <img
                        className="h-8 w-8 object-cover rounded-full flex-shrink-0 mt-1"
                        src={comment.user.profileUrl}
                        alt=""
                      />
                      <div className="pl-4">
                        <div className="flex flex-col items-start md:flex-row md:gap-2">
                          <p className="text-xs text-neutral font-semibold">
                            {comment.user.name}
                          </p>
                          <BsDot className="text-base-300" />
                          <p className="text-xs text-neutral italic">
                            {formatCommDate(comment.createdAt)}
                          </p>
                        </div>
                        <p className="text-xs text-neutral">{comment.text}</p>
                      </div>
                    </div>
                    {(comment.userId === selectedComms.userId ||
                      projectInformation.userId === userDetails.id) && (
                      <FaRegTrashCan
                        className="mx-6 text-neutral cursor-pointer hover:text-error transition-all duration-300"
                        onClick={() => handleDeleteComment(comment.id)}
                      />
                    )}
                  </div>
                ))}
          </div>
        </div>
        <div className="bg-base-100 mt-6 rounded-xl flex items-center h-10">
          <input
            type="text"
            placeholder="Type here"
            className="input text-sm input-ghost w-full focus:outline-none h-10 rounded-xl"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            className="btn btn-neutral text-sm font-medium normal-case btn-sm md:h-10"
            onClick={handleAddComment}
          >
            Send
          </button>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default ViewCommsModal;
