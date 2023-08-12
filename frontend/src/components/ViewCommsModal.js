function ViewCommsModal({ activeComm }) {
  function formatCommDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
  console.log(activeComm);

  return (
    <dialog id="viewCommsModal" className="modal backdrop-blur-sm not-prose">
      <form method="dialog" className="modal-box bg-white">
        <button className="btn btn-sm btn-circle btn-ghost outline-none absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg text-left">{activeComm.title}</h3>
        <p>{formatCommDate(activeComm.createdAt)}</p>
        <div className="w-full px-2 mt-4 max-h-[30vh] md:max-h-[50vh] overflow-y-scroll">
          <div className="flex flex-col">
            <div>{activeComm.description}</div>
          </div>
        </div>
        <button
          className="btn btn-primary font-medium text-sm normal-case w-full mt-4"
          //   onClick={handleEditProfile}
        >
          Button
        </button>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default ViewCommsModal;
