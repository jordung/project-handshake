import { useNavigate } from "react-router-dom";
import error from "../assets/error/error.svg";

function Error() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col px-8 pt-8 pb-0 text-center min-h-screen justify-start items-center prose md:min-w-full md:overflow-hidden md:justify-center md:pt-72">
      <div className="fixed bottom-0 -z-10 md:top-0">
        <img
          className="h-96 object-cover mb-0 md:h-[120vh]"
          src={error}
          alt="error"
        />
      </div>
      <h2 className="mt-28">This page is cordoned off!</h2>
      <p className="mb-2 md:w-2/3 lg:w-1/3">
        Oops! It seems like the path to volunteering has encountered a hiccup.
        Just like a stray pebble on a smooth trail, our app has stumbled upon a
        digital pothole, swallowing some well-intentioned volunteers. But fear
        not, we're already setting up markers to mend the virtual road.
      </p>
      <p className="my-2 md:w-2/3 lg:w-1/3">
        In the meantime, why not explore other areas of the app or learn more
        about the incredible impact our volunteers have made so far?
      </p>
      <button
        className="btn btn-neutral mt-16 md:mt-1"
        onClick={() => navigate("/")}
      >
        Back
      </button>
    </div>
  );
}

export default Error;
