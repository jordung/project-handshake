import volunteerHomeImg from "../assets/home/volunteerhome.png";
import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import {
  formatDateTime,
  getOrganiserTypeDisplay,
  getProjectTargetDisplay,
} from "../constants/formatProjectCard";

function VolunteerHome() {
  const [pageLoading, setPageLoading] = useState(true);
  const [projectList, setProjectList] = useState([]);
  const [filterTargetComm, setFilterTargetComm] = useState(null);
  const [filteredProjectList, setFilteredProjectList] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_DB_API}/projects`
      );
      setProjectList(response.data.data);
      setPageLoading(false);
    };

    getProjects();
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
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="opacity-30 h-[30vh] overflow-y-hidden xl:h-[50vh]">
          <img
            className="h-[50vh] object-cover m-0 xl:h-[100vh]"
            src={volunteerHomeImg}
            alt="volunteer home"
          />
        </div>
        <div className="absolute prose inset-0 flex flex-col items-center justify-center text-center mx-8 lg:min-w-full">
          <h2 className="m-0 md:text-4xl">Join hands. Change the world.</h2>
          <p className="mb-0 font-medium">Unite, Volunteer, Transform.</p>
          <p className="mt-0 font-medium">
            Join now to make a meaningful impact on lives and communities
            worldwide.
          </p>
        </div>
      </div>
      <div className="md:w-full flex flex-col items-center">
        <div className="flex flex-col justify-center mt-4 mb-2 mx-8 prose md:text-center">
          <h2 className="mb-0">Ready To Make A Difference?</h2>
          <p className="mt-0 text-sm font-medium">
            Small Acts, Big Impact. Make a Difference Today.
          </p>
        </div>

        {/* Filter Section */}
        <div className="my-4 flex flex-col mx-8">
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

        {/* Projects Section */}
        <div className="flex flex-col mx-4 mb-8 md:flex-row md:flex-wrap md:gap-3 md:justify-center">
          {filteredProjectList.length > 0 &&
            filteredProjectList.map((project) => (
              <ProjectCard
                key={project.id}
                projectId={project.id}
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
    </div>
  );
}

export default VolunteerHome;
