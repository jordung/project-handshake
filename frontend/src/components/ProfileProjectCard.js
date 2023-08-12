import { useNavigate } from "react-router-dom";

function ProfileProjectCard(props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-between justify-center gap-2 shadow-lg w-full rounded-xl p-4">
      <div
        className="flex flex-col justify-between cursor-pointer hover:text-primary transition-all duration-300"
        onClick={() => navigate(`/project/${props.projectId}`)}
      >
        <p className="text-sm font-medium truncate">{props.projectTitle}</p>
        <p className="text-xs">{props.projectDate}</p>
        <p className="text-xs">{props.projectLocation}</p>
      </div>
      <div className="flex items-center justify-between cursor-pointer group w-full">
        <div
          className="flex items-center gap-2 w-full"
          onClick={() => navigate(`/organiser/${props.organiserId}`)}
        >
          <img
            className="h-8 w-8 object-cover rounded-full"
            src={props.organiserImg}
            alt="profile"
          />
          <p className="text-sm font-medium truncate group-hover:text-primary transition-all duration-300">
            {props.organiserName}
          </p>
          <div className="bg-neutral py-1 px-2 rounded-md group-hover:bg-primary transition-all duration-300">
            <p className="text-xs uppercase text-white font-semibold">
              {props.organiserType}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileProjectCard;
