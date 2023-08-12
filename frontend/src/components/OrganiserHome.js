import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";
import axios from "axios";
import {
  formatDateTime,
  getProjectTargetDisplay,
  getOrganiserTypeDisplay,
} from "../constants/formatProjectCard";
import organiserHome from "../assets/home/organiserHome.svg";
import { FaCanadianMapleLeaf } from "react-icons/fa6";

function OrganiserHome() {
  const [pageLoading, setPageLoading] = useState(true);
  const [upcomingProjectsList, setUpcomingProjectsList] = useState([]);
  const [pastProjectsList, setPastProjectsList] = useState([]);

  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const getUserDetails = async () => {
        await axios
          .get(`${process.env.REACT_APP_DB_API}/users`, {
            params: {
              email: user.email,
            },
          })
          .then((userDetails) => {
            const getProjects = async () => {
              const projectInformation = await axios.get(
                `${process.env.REACT_APP_DB_API}/organisers/${userDetails.data.data.id}`,
                {}
              );
              // console.log(projectInformation.data.data);
              setUpcomingProjectsList(
                projectInformation.data.data.upcomingProjects
              );
              setPastProjectsList(projectInformation.data.data.pastProjects);
              setPageLoading(false);
            };
            getProjects();
          });
      };

      getUserDetails();
    }
  }, [isAuthenticated]);

  if (pageLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center md:mb-20">
      <div className="relative">
        <div className="opacity-30 h-[30vh] overflow-y-hidden xl:h-[50vh]">
          <img
            className="h-[50vh] object-cover m-0 xl:h-[100vh]"
            src={organiserHome}
            alt="volunteer home"
          />
        </div>
        <div className="absolute prose inset-0 flex flex-col items-center justify-center text-center mx-8 md:mx-0 lg:min-w-full">
          <h2 className="m-0 md:text-4xl">Your Projects</h2>
          <p className="mt-0 font-medium">
            All about the projects that you're organising!
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center mx-8">
        {/* Upcoming Projects Section */}

        <div className="mt-8 flex flex-col items-start justify-center min-w-full md:items-center">
          <h6 className="text-lg font-semibold text-neutral">
            Upcoming Projects
          </h6>
          {upcomingProjectsList.length > 0 ? (
            <div className="flex flex-col md:flex-row md:flex-wrap md:gap-3 md:justify-center">
              {upcomingProjectsList.length > 0 &&
                upcomingProjectsList.map((project) => (
                  <ProjectCard
                    key={project.id}
                    projectId={project.id}
                    projectImg={project.image}
                    projectTitle={project.title}
                    projectDate={formatDateTime(
                      project.startDate,
                      project.endDate
                    )}
                    projectTarget={getProjectTargetDisplay(
                      project.targetCommId
                    )}
                    currentVolunteerCount={project.volunteersCount}
                    requiredVolunteerCount={project.volunteersRequired}
                    organiserId={project.user.id}
                    organiserImg={project.user.profileUrl}
                    organiserName={project.user.name}
                    organiserType={getOrganiserTypeDisplay(
                      project.user.usertypeId
                    )}
                    projectLikeCount={project.likesCount}
                  />
                ))}
            </div>
          ) : (
            <p className="mt-2 text-sm font-medium text-neutral italic">
              <FaCanadianMapleLeaf className="h-4 w-4 inline-block text-secondary" />{" "}
              No upcoming projects found, create a project now!
            </p>
          )}
        </div>
        {/* Past Projects Section */}
        <div className="mt-8 flex flex-col items-start justify-center min-w-full md:items-center">
          <h6 className="text-lg font-semibold text-neutral">Past Projects</h6>
          {pastProjectsList.length > 0 ? (
            <div className="flex flex-col md:flex-row md:flex-wrap md:gap-3 md:justify-center">
              {pastProjectsList.length > 0 &&
                pastProjectsList.map((project) => (
                  <ProjectCard
                    key={project.id}
                    projectId={project.id}
                    projectImg={project.image}
                    projectTitle={project.title}
                    projectDate={formatDateTime(
                      project.startDate,
                      project.endDate
                    )}
                    projectTarget={getProjectTargetDisplay(
                      project.targetCommId
                    )}
                    currentVolunteerCount={project.volunteersCount}
                    requiredVolunteerCount={project.volunteersRequired}
                    organiserId={project.user.id}
                    organiserImg={project.user.profileUrl}
                    organiserName={project.user.name}
                    organiserType={getOrganiserTypeDisplay(
                      project.user.usertypeId
                    )}
                    projectLikeCount={project.likesCount}
                  />
                ))}
            </div>
          ) : (
            <p className="mt-2 text-sm font-medium text-neutral italic">
              <FaCanadianMapleLeaf className="h-4 w-4 inline-block text-secondary" />{" "}
              No past projects found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrganiserHome;
