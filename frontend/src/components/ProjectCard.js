import { FaRegHeart, FaHeart, FaHeartCircleXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProjectCard(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [projectLikes, setProjectLikes] = useState(props.projectLikeCount);
  const navigate = useNavigate();

  const getProjectLike = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_DB_API}/likes/${props.userId}`
    );
    const likedProjects = response.data.data.map((item) => item.projectId);
    if (likedProjects.indexOf(props.projectId) !== -1) {
      setIsLiked(true);
    }
  };

  useEffect(() => {
    if (props.usertypeId === 1) {
      getProjectLike();
    }
  }, []);

  const handleLike = async () => {
    if (isLiked) {
      // user unlikes the post
      try {
        await axios.delete(`${process.env.REACT_APP_DB_API}/likes`, {
          data: {
            userId: props.userId,
            projectId: props.projectId,
          },
        });
        // console.log(response);
        setIsLiked(false);

        const getUpdatedLikesCount = await axios.get(
          `${process.env.REACT_APP_DB_API}/projects/${props.projectId}`,
          {
            params: {
              userId: props.userId,
            },
          }
        );
        // console.log(getUpdatedLikesCount);
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
            userId: props.userId,
            projectId: props.projectId,
          }
        );
        // console.log(response);
        setIsLiked(true);

        const getUpdatedLikesCount = await axios.get(
          `${process.env.REACT_APP_DB_API}/projects/${props.projectId}`,
          {
            params: {
              userId: props.userId,
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

  return (
    <div className="mb-4 w-full shadow-lg rounded-xl p-2 md:max-w-sm md:mb-0">
      <div
        className="relative cursor-pointer group"
        onClick={() => navigate(`/project/${props.projectId}`)}
      >
        <img
          className="w-full h-64 object-cover rounded-xl group-hover:opacity-70 transition-all duration-300"
          src={props.projectImg}
          alt="project"
        />
        <div className="absolute bottom-0 inset-x-0 bg-white p-2 flex flex-col group-hover:text-primary transition-all duration-300">
          <div className="flex justify-between items-center max-w-full">
            <div className="w-2/3 md:w-3/4">
              <p className="truncate text-sm font-medium">
                {props.projectTitle}
              </p>
              <p className="text-xs">{props.projectDate}</p>
              <p className="text-xs">{props.projectLocation}</p>
            </div>
            <span className="badge badge-accent uppercase py-3 text-[0.6rem] font-semibold text-neutral">
              {props.projectTarget}
            </span>
          </div>
          <div
            className="flex items-center gap-2 tooltip tooltip-neutral before:text-xs"
            data-tip="Volunteers pledged"
          >
            <progress
              className="progress progress-primary w-full bg-neutral h-5 p-1"
              value={props.currentVolunteerCount}
              max={props.requiredVolunteerCount}
            ></progress>
            <p className="text-xs font-semibold text-neutral">
              {Math.floor(
                (props.currentVolunteerCount / props.requiredVolunteerCount) *
                  100
              )}
              %
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mx-2 my-1 max-w-full">
        <div
          className="flex items-center gap-2 group cursor-pointer max-w-full"
          onClick={() => navigate(`/organiser/${props.organiserId}`)}
        >
          <img
            className="h-8 w-8 object-cover rounded-full"
            src={props.organiserImg}
            alt="profile"
          />
          <div className="flex flex-col">
            <p className="text-xs font-medium w-full truncate md:text-sm group-hover:text-primary transition-all duration-300">
              {props.organiserName}
            </p>
            <div className="bg-neutral py-1 px-2 max-w-fit rounded-md group-hover:bg-primary transition-all duration-300">
              <p className="text-[0.6rem] uppercase text-white font-semibold md:text-xs">
                {props.organiserType}
              </p>
            </div>
          </div>
        </div>
        {props.usertypeId === 1 ? (
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
          <div
            className="flex items-center gap-1 cursor-pointer"
            // onClick={handleLike}
          >
            <span className="transform text-neutral transition-all duration-300">
              <FaHeartCircleXmark />
            </span>
            <p className="text-xs transition-all duration-300">
              {projectLikes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
