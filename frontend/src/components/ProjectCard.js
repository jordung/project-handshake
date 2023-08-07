import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useState } from "react";

function ProjectCard(props) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="mb-4 w-full md:max-w-sm md:mb-0">
      <div className="relative cursor-pointer hover:opacity-80 transition-opacity duration-300">
        <img
          className="object-cover opacity-80 rounded-xl"
          src={props.projectImg}
          alt="project"
        />
        <div className="absolute bottom-2 inset-x-2 bg-base-100 p-2 bg-opacity-90 rounded-lg flex flex-col">
          <div className="flex justify-between items-center gap-2">
            <div className="w-2/3">
              <p className="truncate text-sm font-medium">
                {props.projectTitle}
              </p>
              <p className="text-xs">{props.projectDate}</p>
            </div>
            <span className="badge badge-accent uppercase py-3 text-xs font-semibold text-neutral">
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
      <div className="flex items-center justify-between mx-2 mt-1">
        <div className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300 cursor-pointer">
          <img
            className="h-8 w-8 object-cover rounded-full"
            src={props.organiserImg}
            alt="profile"
          />
          <p className="text-sm font-medium">{props.organiserName}</p>
          <div className="bg-neutral py-1 px-2 rounded-md">
            <p className="text-xs uppercase text-white font-semibold">
              {props.organiserType}
            </p>
          </div>
        </div>
        <div
          className="flex items-center gap-1 hover:opacity-80 transition-opacity duration-300 cursor-pointer"
          onClick={() => setIsLiked((prevState) => !prevState)}
        >
          <span
            className={`transform ${isLiked ? "scale-110" : "scale-100"} ${
              isLiked ? "text-red-400" : "text-neutral"
            } transition-transform duration-300`}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </span>
          <p className="text-xs">{props.projectLikeCount}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
