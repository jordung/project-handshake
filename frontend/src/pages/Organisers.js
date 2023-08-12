import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { getOrganiserTypeDisplay } from "../constants/formatProjectCard";
import organisersImg from "../assets/organisers/organisers.svg";
import OrganiserCard from "../components/OrganiserCard";

function Organisers() {
  const [pageLoading, setPageLoading] = useState(true);
  const [organiserList, setOrganiserList] = useState([]);

  useEffect(() => {
    const getOrganisers = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_DB_API}/users/organisers`
      );
      // console.log(response.data.data);
      setOrganiserList(response.data.data);
      setPageLoading(false);
    };

    getOrganisers();
  }, []);

  if (pageLoading) {
    return <Spinner />;
  }

  return (
    <div className="bg-white w-full pt-16 md:py-10 md:flex md:flex-col md:items-center">
      <div className="relative">
        <div className="opacity-30 h-[25vh] w-screen overflow-y-hidden xl:h-[50vh]">
          <img
            className="w-[100vw] object-cover m-0"
            src={organisersImg}
            alt="volunteer home"
          />
        </div>
        <div className="absolute prose inset-0 flex flex-col items-center justify-center text-center lg:min-w-full">
          <h2 className="m-0 md:text-4xl">Organisers</h2>
          <p className="mt-0 font-medium text-xs w-2/3 lg:w-1/3 md:text-sm md:mt-2">
            Meet our organisers who change lives, one initiative at a time.
          </p>
        </div>
      </div>
      <div className="flex flex-col mx-8 mt-0 md:flex-row md:flex-wrap md:gap-3 md:justify-center md:mt-8 md:w-screen">
        {organiserList.length > 0 &&
          organiserList
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((organiser) => (
              <OrganiserCard
                key={organiser.id}
                organiserId={organiser.id}
                organiserImg={organiser.profileUrl}
                organiserName={organiser.name}
                organiserUsername={organiser.username}
                organiserType={getOrganiserTypeDisplay(organiser.usertypeId)}
                organiserBio={organiser.biography}
              />
            ))}
      </div>
    </div>
  );
}

export default Organisers;
