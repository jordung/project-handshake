import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useState } from "react";

function ProjectCard(props) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="mx-4 mb-8">
      <div className="relative rounded-xl overflow-hidden">
        <img
          className="object-cover opacity-70 max-w-xs md:max-w-sm"
          src={props.cardImg}
          alt="project"
        />
        <div className="absolute bottom-2 left-[50%] bg-base-100 bg-opacity-90 translate-x-[-50%] p-2 w-11/12 rounded-lg flex flex-col">
          <div className="flex justify-between items-center gap-2">
            <div>
              <p className="truncate text-sm font-medium">
                Bring the kids out!
              </p>
              <p className="text-xs">30th July 2023</p>
            </div>
            <span className="badge badge-accent uppercase py-3 text-xs font-semibold text-neutral">
              youths
            </span>
          </div>
          <div className="flex items-center gap-2">
            <progress
              className="progress progress-primary w-full"
              value="70"
              max="100"
            ></progress>
            <p className="text-xs font-semibold text-neutral">70%</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mx-2 mt-1">
        <div className="flex items-center gap-2">
          <img
            className="h-8 w-8 object-cover rounded-full"
            src={props.profileImg}
            alt="profile"
          />
          <p className="text-sm font-medium">YouthsForLife</p>
          <div className="bg-neutral py-1 px-2 rounded-md">
            <p className="text-xs uppercase text-white font-semibold">
              organisation
            </p>
          </div>
        </div>

        <div
          className="flex items-center gap-1"
          onClick={() => setIsLiked((prevState) => !prevState)}
        >
          {isLiked ? (
            <FaHeart className="text-red-400" />
          ) : (
            <FaRegHeart className="text-neutral" />
          )}
          <p className="text-xs">55</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
