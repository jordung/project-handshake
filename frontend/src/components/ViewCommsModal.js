import sampleProfilePic from "../assets/pexels-photo-775358.jpeg";
import { BsDot } from "react-icons/bs";

function ViewCommsModal({ activeComm }) {
  // TODO: make this modal dynamic, grab commId from parent and call API to render comm information
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
      <form method="dialog" className="modal-box bg-white w-11/12 max-w-5xl">
        <button className="btn btn-sm btn-circle btn-ghost outline-none absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg text-left">
          Getting to project venue
        </h3>
        <p className="font-semibold text-sm">22 Jul 2023</p>
        <div className="w-full mt-1 max-h-[30vh] md:max-h-[30vh] overflow-y-scroll">
          <div className="flex flex-col">
            <div className="font-normal text-sm">
              Nearest MRT stop: Bendemeer MRT (Downtown Line) Take Exit B, and
              follow the escalator until you see Bendemeer Market. Once you see
              the market, take a right and you will see this huge sheltered
              foyer area, which will be our meet-up point
              {/* {projectInformation.description
              .split("\n")
              .map((paragraph, index) => (
                <p key={index} className="text-sm mb-2">
                  {paragraph}
                </p>
              ))} */}
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mt-4">Comments</h4>
          <div className="h-56 shadow-lg max-h-[30vh] overflow-auto rounded-xl">
            <div className="flex items-start mx-2 my-1 py-1">
              <img
                className="h-8 w-8 object-cover rounded-full flex-shrink-0 mt-1"
                src={sampleProfilePic}
                alt=""
              />
              <div className="pl-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-neutral font-semibold">John Doe</p>
                  <BsDot className="text-base-300" />
                  <p className="text-xs text-neutral">22 Jul 2023</p>
                </div>
                <p className="text-xs text-neutral">
                  Can I check if slippers are allowed? Can I check if slippers
                  are allowed? Can I check if slippers are allowed? Can I check
                  if slippers are allowed? Can I check if slippers are allowed?
                  Can I check if slippers are allowed? Can I check if slippers
                  are allowed? Can I check if slippers are allowed? Can I check
                  if slippers are allowed? Can I check if slippers are allowed?
                  Can I check if slippers are allowed?
                </p>
              </div>
            </div>
            <div className="flex items-start mx-2 my-1 py-1">
              <img
                className="h-8 w-8 object-cover rounded-full flex-shrink-0 mt-1"
                src={sampleProfilePic}
                alt=""
              />
              <div className="pl-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-neutral font-semibold">John Doe</p>
                  <BsDot className="text-base-300" />
                  <p className="text-xs text-neutral">22 Jul 2023</p>
                </div>
                <p className="text-xs text-neutral">
                  Can I check if slippers are allowed? Can I check if slippers
                  are allowed? Can I check if slippers are allowed? Can I check
                  if slippers are allowed? Can I check if slippers are allowed?
                  Can I check if slippers are allowed? Can I check if slippers
                  are allowed? Can I check if slippers are allowed? Can I check
                  if slippers are allowed? Can I check if slippers are allowed?
                  Can I check if slippers are allowed?
                </p>
              </div>
            </div>
            {/* Start of Comment Card */}
            <div className="flex items-start mx-2 my-1 py-1">
              <img
                className="h-8 w-8 object-cover rounded-full flex-shrink-0 mt-1"
                src={sampleProfilePic}
                alt=""
              />
              <div className="pl-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-neutral font-semibold">John Doe</p>
                  <BsDot className="text-base-300" />
                  <p className="text-xs text-neutral">22 Jul 2023</p>
                </div>
                <p className="text-xs text-neutral">
                  Can I check if slippers are allowed? Can I check if slippers
                  are allowed? Can I check if slippers are allowed? Can I check
                  if slippers are allowed? Can I check if slippers are allowed?
                  Can I check if slippers are allowed? Can I check if slippers
                  are allowed? Can I check if slippers are allowed? Can I check
                  if slippers are allowed? Can I check if slippers are allowed?
                  Can I check if slippers are allowed?
                </p>
              </div>
            </div>
            {/* End of Comment Card */}
            <div className="flex items-start mx-2 my-1 py-1">
              <img
                className="h-8 w-8 object-cover rounded-full flex-shrink-0 mt-1"
                src={sampleProfilePic}
                alt=""
              />
              <div className="pl-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-neutral font-semibold">John Doe</p>
                  <BsDot className="text-base-300" />
                  <p className="text-xs text-neutral">22 Jul 2023</p>
                </div>
                <p className="text-xs text-neutral">
                  Can I check if slippers are allowed? Can I check if slippers
                  are allowed? Can I check if slippers are allowed? Can I check
                  if slippers are allowed? Can I check if slippers are allowed?
                  Can I check if slippers are allowed? Can I check if slippers
                  are allowed? Can I check if slippers are allowed? Can I check
                  if slippers are allowed? Can I check if slippers are allowed?
                  Can I check if slippers are allowed?
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-base-100 mt-6 rounded-xl flex items-center h-10">
          <input
            type="text"
            placeholder="Type here"
            className="input text-sm input-ghost w-full focus:outline-none h-10 rounded-xl"
          />
          <button className="btn btn-neutral text-sm font-medium normal-case btn-sm md:h-10">
            Send
          </button>
        </div>
        {/* <button
          className="btn btn-primary font-medium text-sm normal-case w-full mt-4"
          //   onClick={handleEditProfile}
        >
          Button
        </button> */}
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default ViewCommsModal;
