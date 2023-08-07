function ProfileProjectCard(props) {
  return (
    <div className="flex flex-col items-between justify-center gap-2 shadow-lg w-full rounded-xl p-4">
      <div className="flex justify-between">
        <p className="text-sm truncate">{props.projectTitle}</p>
        <p className="text-sm">{props.projectDate}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            className="h-8 w-8 object-cover rounded-full"
            src={props.organiserImg}
            alt="profile"
          />
          <p className="text-sm font-medium truncate">{props.organiserName}</p>
          <div className="bg-neutral py-1 px-2 rounded-md">
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
