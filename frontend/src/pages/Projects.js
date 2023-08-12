import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";
import {
  getOrganiserTypeDisplay,
  getProjectTargetDisplay,
} from "../constants/formatProjectCard";
import { formatDateTime } from "../constants/formatProjectCard";
import projectsImg from "../assets/projects/projects.svg";
import { useAuth0 } from "@auth0/auth0-react";

function Projects() {
  const [pageLoading, setPageLoading] = useState(true);
  const [projectList, setProjectList] = useState([]);
  const [filterTargetComm, setFilterTargetComm] = useState(null);
  const [filteredProjectList, setFilteredProjectList] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    const getProjects = async () => {
      const projectsList = await axios.get(
        `${process.env.REACT_APP_DB_API}/projects`
      );

      const userDetails = await axios.get(
        `${process.env.REACT_APP_DB_API}/users`,
        {
          params: {
            email: user.email,
          },
        }
      );
      Promise.all([projectsList.data.data, userDetails.data.data]).then(
        (values) => {
          setProjectList(values[0]);
          setUserDetails(values[1]);
          setPageLoading(false);
        }
      );
    };
    if (isAuthenticated) {
      getProjects();
    } else {
      const getUnauthorisedProjects = async () => {
        const unauthorisedProjectList = await axios.get(
          `${process.env.REACT_APP_DB_API}/projects`
        );
        setProjectList(unauthorisedProjectList.data.data);
        setPageLoading(false);
      };
      getUnauthorisedProjects();
    }
  }, []);

  useEffect(() => {
    if (filterTargetComm) {
      const filteredData = projectList.filter(
        (project) => project.targetCommId === filterTargetComm
      );
      setFilteredProjectList(filteredData);
    } else {
      setFilteredProjectList(projectList);
    }
  }, [filterTargetComm, projectList]);

  if (pageLoading) {
    return <Spinner />;
  }

  return (
    <div className="bg-white w-full pt-16 md:pt-10 md:pb-10 md:flex md:flex-col md:items-center">
      <div className="relative">
        <div className="opacity-30 h-[25vh] w-screen overflow-y-hidden xl:h-[50vh]">
          <img
            className="w-[100vw] object-cover m-0"
            src={projectsImg}
            alt="volunteer home"
          />
        </div>
        <div className="absolute prose inset-0 flex flex-col items-center justify-center text-center lg:min-w-full">
          <h2 className="m-0 md:text-4xl">Projects</h2>
          <p className="mt-0 font-medium text-xs w-2/3 lg:w-1/3 md:text-sm md:mt-2">
            Together, these tiny acts of kindness, determination, and
            perseverance gather strength and become an unstoppable force,
            capable of achieving giant leaps of progress and change in this
            world
          </p>
        </div>
      </div>
      {/* Filter Section */}
      <div className="mt-4 flex flex-col mx-8">
        <div className="flex flex-wrap gap-2">
          <div
            className={`btn btn-xs transition-all duration-300 font-normal  ${
              filterTargetComm === 1
                ? "btn-primary"
                : "btn-ghost border-1 border-neutral"
            }`}
            onClick={() => setFilterTargetComm(1)}
          >
            Seniors
          </div>
          <div
            className={`btn btn-xs transition-all duration-300 font-normal  ${
              filterTargetComm === 2
                ? "btn-primary"
                : "btn-ghost border-1 border-neutral"
            }`}
            onClick={() => setFilterTargetComm(2)}
          >
            Youths
          </div>
          <div
            className={`btn btn-xs transition-all duration-300 font-normal  ${
              filterTargetComm === 3
                ? "btn-primary"
                : "btn-ghost border-1 border-neutral"
            }`}
            onClick={() => setFilterTargetComm(3)}
          >
            Animals
          </div>
          <div
            className={`btn btn-xs transition-all duration-300 font-normal  ${
              filterTargetComm === 4
                ? "btn-primary"
                : "btn-ghost border-1 border-neutral"
            }`}
            onClick={() => setFilterTargetComm(4)}
          >
            Environment
          </div>
          <div
            className={`btn btn-xs transition-all duration-300 font-normal  ${
              filterTargetComm === 5
                ? "btn-primary"
                : "btn-ghost border-1 border-neutral"
            }`}
            onClick={() => setFilterTargetComm(5)}
          >
            People with Disabilities
          </div>
          <div
            className={`btn btn-xs transition-all duration-300 font-normal  ${
              filterTargetComm === 6
                ? "btn-primary"
                : "btn-ghost border-1 border-neutral"
            }`}
            onClick={() => setFilterTargetComm(6)}
          >
            Others
          </div>
        </div>
        <div>
          <button
            className={`btn btn-xs uppercase mt-2 btn-secondary font-normal transition-all duration-300 ${
              filterTargetComm ? "opacity-100" : "opacity-0"
            }`}
            disabled={!filterTargetComm}
            onClick={() => setFilterTargetComm(null)}
          >
            Clear Filter
          </button>
        </div>
      </div>
      <div className="flex flex-col mx-8 mt-4 md:flex-row md:flex-wrap md:gap-3 md:justify-center">
        {filteredProjectList.length > 0 &&
          filteredProjectList.map((project) => (
            <ProjectCard
              key={project.id}
              projectId={project.id}
              usertypeId={userDetails.usertypeId}
              userId={userDetails.id}
              projectImg={project.image}
              projectTitle={project.title}
              projectDate={formatDateTime(project.startDate, project.endDate)}
              projectTarget={getProjectTargetDisplay(project.targetCommId)}
              currentVolunteerCount={project.volunteersCount}
              requiredVolunteerCount={project.volunteersRequired}
              organiserId={project.userId}
              organiserImg={project.user.profileUrl}
              organiserName={project.user.name}
              organiserType={getOrganiserTypeDisplay(project.user.usertypeId)}
              projectLikeCount={project.likesCount}
              projectLocation={project.location}
            />
          ))}
      </div>
    </div>
  );
}

export default Projects;
