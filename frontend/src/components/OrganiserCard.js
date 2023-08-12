import { useNavigate } from "react-router-dom";

function OrganiserCard(props) {
  const navigate = useNavigate();

  return (
    <div
      className="mb-4 cursor-pointer group w-full shadow-xl rounded-xl md:max-w-sm md:mb-0 flex items-center h-48 py-12 px-8"
      onClick={() => navigate(`/organiser/${props.organiserId}`)}
    >
      <div className="flex justify-center items-start">
        <div className="group-hover:opacity-70 transition-all duration-300 flex-shrink-0">
          <img
            className="h-16 w-16 object-cover rounded-full"
            src={props.organiserImg}
            alt="project"
          />
        </div>
        <div className="ml-4 flex flex-col items-start">
          <p className="text-xs font-medium md:text-sm group-hover:text-primary transition-all duration-300">
            {props.organiserName}
          </p>
          <p className="text-xs font-normal italic md:text-sm group-hover:text-primary transition-all duration-300">
            @{props.organiserUsername}
          </p>
          <div className="bg-neutral py-1 px-2 mt-1 rounded-md mr-2 group-hover:bg-primary transition-all duration-300">
            <p className="text-[0.6rem] uppercase text-white font-semibold md:text-xs">
              {props.organiserType}
            </p>
          </div>
          <p className="text-xs mt-2 max-h-16 line-clamp-4 overflow-ellipsis">
            {props.organiserBio || ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrganiserCard;
