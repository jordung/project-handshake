import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProjectCard(props) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="mb-4 w-full shadow-lg rounded-xl p-2 md:max-w-sm md:mb-0">
      <div
        className="relative cursor-pointer group"
        onClick={() => navigate(`/project/${props.projectId}`)}
      >
        <img
          className="object-cover rounded-xl group-hover:opacity-70 transition-all duration-300"
          src={props.projectImg}
          alt="project"
        />
        <div className="absolute bottom-0 inset-x-0 bg-white p-2 flex flex-col group-hover:text-primary transition-all duration-300">
          <div className="flex justify-between items-center gap-2">
            <div className="w-2/3">
              <p className="truncate text-sm font-medium">
                {props.projectTitle}
              </p>
              <p className="text-xs">{props.projectDate}</p>
              <p className="text-xs">{props.projectLocation}</p>
            </div>
            <span className="badge badge-accent uppercase py-3 text-[0.6rem] font-semibold text-neutral md:text-xs">
              {props.projectTarget}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <progress
              className="progress progress-primary w-full"
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
      <div
        className="flex items-center justify-between mx-2 mt-1 max-w-full"
        onClick={() => navigate(`/organiser/${props.organiserId}`)}
      >
        <div className="flex items-center gap-2 group cursor-pointer max-w-full">
          <img
            className="h-8 w-8 object-cover rounded-full"
            src={props.organiserImg}
            alt="profile"
          />
          <p className="text-xs font-medium truncate md:text-sm group-hover:text-primary transition-all duration-300">
            {props.organiserName}
          </p>
          <div className="bg-neutral py-1 px-2 rounded-md mr-2 group-hover:bg-primary transition-all duration-300">
            <p className="text-[0.6rem] uppercase text-white font-semibold md:text-xs">
              {props.organiserType}
            </p>
          </div>
        </div>
        <div
          className="flex items-center gap-1 group cursor-pointer"
          onClick={() => setIsLiked((prevState) => !prevState)}
        >
          <span
            className={`transform ${isLiked ? "scale-110" : "scale-100"} ${
              isLiked
                ? "text-red-400"
                : "text-neutral group-hover:text-primary "
            } transition-all duration-300`}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </span>
          <p className="text-xs group-hover:text-primary transition-all duration-300">
            {props.projectLikeCount}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
