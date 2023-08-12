import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ProfileProjectCard from "../components/ProfileProjectCard";
import Tabs from "../components/Tabs";
import profilePageImg from "../assets/profile/wave.svg";
import {
  FaRegHandPeace,
  FaRegFaceLaughWink,
  FaRegHospital,
  FaCanadianMapleLeaf,
} from "react-icons/fa6";
import axios from "axios";
import {
  formatDateTime,
  getOrganiserTypeDisplay,
} from "../utils/formatInformation";
import { useNavigate, useParams } from "react-router-dom";

function Organiser() {
  const navigate = useNavigate();
  const { isLoading, user } = useAuth0();
  const [pageLoading, setPageLoading] = useState(true);
  const [organiserInformation, setOrganiserInformation] = useState([]);
  const [organiserProjectInformation, setOrganiserProjectInformation] =
    useState([]);

  const { organiserId } = useParams();

  useEffect(() => {
    const getOrganiserInformation = async () => {
      const orgInfo = await axios.get(
        `${process.env.REACT_APP_DB_API}/users/organiser/${organiserId}`
      );

      const orgProjectInfo = await axios.get(
        `${process.env.REACT_APP_DB_API}/organisers/${organiserId}`
      );

      Promise.all([orgInfo.data.data, orgProjectInfo.data.data]).then(
        (values) => {
          setOrganiserInformation(values[0]);
          setOrganiserProjectInformation(values[1]);
          // console.log(values[1]);
          if (values[0].email === user.email) {
            navigate("/profile");
          }
          setPageLoading(false);
        }
      );
    };

    getOrganiserInformation();
  }, []);

  if (pageLoading || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full pt-16">
      <img
        className="hidden md:block fixed -z-20 w-screen h-[90vh] bottom-0 object-cover"
        src={profilePageImg}
        alt="background"
      />
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-start lg:gap-8">
        <div className="lg:w-1/6 lg:flex-col lg:justify-center lg:items-center">
          <div className="flex flex-col justify-center items-center mt-8 prose md:min-w-full lg:items-center">
            <img
              className="h-48 w-48 object-cover rounded-full shadow-xl"
              src={organiserInformation.profileUrl}
              alt="profile"
            />
            <h3 className="my-0 text-center">{organiserInformation.name}</h3>
            <p className="mt-0 font-medium text-center">
              @{organiserInformation.username}
            </p>
          </div>
          <div className="mx-8 md:mx-40 lg:mx-0">
            <h6 className="text-lg font-semibold mt-8">Biography</h6>
            <p className="text-sm">{organiserInformation.biography}</p>
            <h6 className="text-lg font-semibold mt-8">Location</h6>
            <p className="text-sm">{organiserInformation.location}</p>
          </div>
        </div>
        <div className="mx-8 md:mx-40 lg:mx-0 lg:w-1/2">
          <h6 className="text-lg font-semibold mt-8">Organiser Information</h6>
          {/* Volunteer Information Card */}
          <div className="shadow-lg p-4 rounded-xl mb-8 bg-white">
            <div>
              <p className="font-semibold">Phone Number</p>
              <p className="text-sm">{organiserInformation.phone}</p>
            </div>
            <div className="mt-8">
              <p className="font-semibold">Email Address</p>
              <p className="text-sm">{organiserInformation.email}</p>
            </div>
            <div className="mt-8">
              <p className="font-semibold">Website</p>
              <a
                className="text-sm"
                href={organiserInformation.organiser.website || null}
                target="_blank"
                rel="noreferrer"
              >
                {organiserInformation.organiser.website !== null
                  ? organiserInformation.organiser.website
                  : "NIL"}
              </a>
            </div>
          </div>
          {/* Stats Component */}
          <div className="stats bg-white shadow max-w-full md:min-w-full md:flex ">
            <div className="stat">
              <div className="stat-title text-xs text-neutral font-medium md:text-center">
                Ongoing <br /> Projects
              </div>
              <div className="stat-value text-2xl flex items-center gap-3 md:justify-center md:text-3xl">
                <span className="text-primary">
                  {organiserProjectInformation.upcomingProjects.length}
                </span>
                <FaRegHandPeace className="h-6 w-6 text-neutral" />
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-xs text-neutral font-medium md:text-center">
                Total <br /> Projects
              </div>
              <div className="stat-value text-2xl flex items-center gap-3 md:justify-center md:text-3xl">
                <span className="text-primary">
                  {organiserProjectInformation.totalProjects}
                </span>
                <FaRegHospital className="h-6 w-6 text-neutral" />
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-xs text-neutral font-medium md:text-center">
                Total <br /> Volunteers
              </div>
              <div className="stat-value text-2xl flex items-center gap-3 md:justify-center md:text-3xl">
                <span className="text-primary">
                  {organiserProjectInformation.totalVolunteers || 0}
                </span>
                <FaRegFaceLaughWink className="h-6 w-6 text-neutral" />
              </div>
            </div>
          </div>
          {/* Upcoming Projects */}
          <h6 className="text-lg font-semibold mt-8">All Projects</h6>
          <div className="shadow-lg p-4 rounded-xl mb-8 bg-white">
            <div className="flex flex-col items-center justify-between mx-1 mt-1">
              <Tabs>
                <Tabs.Tab tabLabel="Upcoming">
                  {organiserProjectInformation.upcomingProjects.length > 0 ? (
                    organiserProjectInformation.upcomingProjects.map(
                      (project) => (
                        <ProfileProjectCard
                          key={project.id}
                          projectId={project.id}
                          projectTitle={project.title}
                          projectDate={formatDateTime(
                            project.startDate,
                            project.endDate
                          )}
                          organiserId={project.userId}
                          projectLocation={project.location}
                          organiserImg={project.user.profileUrl}
                          organiserName={project.user.name}
                          organiserType={getOrganiserTypeDisplay(
                            project.user.usertypeId
                          )}
                        />
                      )
                    )
                  ) : (
                    <p className="mt-4 text-sm font-medium text-neutral italic">
                      <FaCanadianMapleLeaf className="h-4 w-4 inline-block text-secondary" />{" "}
                      No upcoming projects found
                    </p>
                  )}
                </Tabs.Tab>
                <Tabs.Tab tabLabel="Past">
                  {organiserProjectInformation.pastProjects.length > 0 ? (
                    organiserProjectInformation.pastProjects.map((project) => (
                      <ProfileProjectCard
                        key={project.id}
                        projectId={project.id}
                        projectTitle={project.title}
                        projectDate={formatDateTime(
                          project.startDate,
                          project.endDate
                        )}
                        organiserId={project.userId}
                        projectLocation={project.location}
                        organiserImg={project.user.profileUrl}
                        organiserName={project.user.name}
                        organiserType={getOrganiserTypeDisplay(
                          project.user.usertypeId
                        )}
                      />
                    ))
                  ) : (
                    <p className="mt-4 text-sm font-medium text-neutral italic">
                      <FaCanadianMapleLeaf className="h-4 w-4 inline-block text-secondary" />{" "}
                      No past projects found
                    </p>
                  )}
                </Tabs.Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Organiser;
