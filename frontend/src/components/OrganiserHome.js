import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";
import cardImg from "../assets/home/cardImg.avif";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  formatDateTime,
  getProjectTargetDisplay,
  getOrganiserTypeDisplay,
} from "../constants/formatProjectCard";

function OrganiserHome() {
  // TODO: Render upcoming projects and past projects using api
  const navigate = useNavigate();

  const [pageLoading, setPageLoading] = useState(true);
  const [projectList, setProjectList] = useState([]);

  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      setPageLoading(false);
    }
  }, [isAuthenticated]);

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

  if (pageLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center mx-8 md:my-20">
      <div className="flex flex-col items-start justify-center min-w-full prose md:items-center">
        <h2 className="mb-0">Your Projects</h2>
        <p className="mt-0 mb-2 text-sm font-medium">
          All about the projects that you're organising!
        </p>
        <button
          className="btn btn-primary normal-case w-full font-medium md:hidden"
          onClick={() => navigate("/createProject")}
        >
          Start something new!
        </button>
      </div>

      {/* Upcoming Projects Section */}
      <div className="mt-8 flex flex-col items-start justify-center min-w-full md:items-center">
        <h6 className="text-lg font-semibold text-neutral">
          Upcoming Projects
        </h6>
        <div className="flex flex-col md:flex-row md:flex-wrap md:gap-3 md:justify-center">
          {projectList.length > 0 &&
            projectList.map((project) => (
              <ProjectCard
                key={project.id}
                projectImg={project.image}
                projectTitle={project.title}
                projectDate={formatDateTime(project.startDate, project.endDate)}
                projectTarget={getProjectTargetDisplay(project.targetCommId)}
                currentVolunteerCount={project.volunteersCount}
                requiredVolunteerCount={project.volunteersRequired}
                organiserImg={project.user.profileUrl}
                organiserName={project.user.name}
                organiserType={getOrganiserTypeDisplay(project.user.usertypeId)}
                projectLikeCount={project.likesCount}
              />
            ))}
        </div>
      </div>
      {/* Past Projects Section */}
      <div className="mt-8 flex flex-col items-start justify-center min-w-full md:items-center">
        <h6 className="text-lg font-semibold text-neutral">Past Projects</h6>
        <div className="flex flex-col md:flex-row md:flex-wrap md:gap-3 md:justify-center">
          <ProjectCard
            projectImg={cardImg}
            projectTitle="Building schools for the less fortunate"
            projectDate="30/07/2023"
            projectTarget="youths"
            currentVolunteerCount="7"
            requiredVolunteerCount="10"
            organiserImg={cardImg}
            organiserName="YouthsForLife"
            organiserType="organisation"
            projectLikeCount="12"
          />
          <ProjectCard
            projectImg={cardImg}
            projectTitle="Building schools for the less fortunate"
            projectDate="30/07/2023"
            projectTarget="youths"
            currentVolunteerCount="7"
            requiredVolunteerCount="10"
            organiserImg={cardImg}
            organiserName="YouthsForLife"
            organiserType="organisation"
            projectLikeCount="12"
          />
          <ProjectCard
            projectImg={cardImg}
            projectTitle="Building schools for the less fortunate"
            projectDate="30/07/2023"
            projectTarget="youths"
            currentVolunteerCount="7"
            requiredVolunteerCount="10"
            organiserImg={cardImg}
            organiserName="YouthsForLife"
            organiserType="organisation"
            projectLikeCount="12"
          />
          <ProjectCard
            projectImg={cardImg}
            projectTitle="Building schools for the less fortunate"
            projectDate="30/07/2023"
            projectTarget="youths"
            currentVolunteerCount="7"
            requiredVolunteerCount="10"
            organiserImg={cardImg}
            organiserName="YouthsForLife"
            organiserType="organisation"
            projectLikeCount="12"
          />
          <ProjectCard
            projectImg={cardImg}
            projectTitle="Building schools for the less fortunate"
            projectDate="30/07/2023"
            projectTarget="youths"
            currentVolunteerCount="7"
            requiredVolunteerCount="10"
            organiserImg={cardImg}
            organiserName="YouthsForLife"
            organiserType="organisation"
            projectLikeCount="12"
          />
          <ProjectCard
            projectImg={cardImg}
            projectTitle="Building schools for the less fortunate"
            projectDate="30/07/2023"
            projectTarget="youths"
            currentVolunteerCount="7"
            requiredVolunteerCount="10"
            organiserImg={cardImg}
            organiserName="YouthsForLife"
            organiserType="organisation"
            projectLikeCount="12"
          />
          <ProjectCard
            projectImg={cardImg}
            projectTitle="Building schools for the less fortunate"
            projectDate="30/07/2023"
            projectTarget="youths"
            currentVolunteerCount="7"
            requiredVolunteerCount="10"
            organiserImg={cardImg}
            organiserName="YouthsForLife"
            organiserType="organisation"
            projectLikeCount="12"
          />
          <ProjectCard
            projectImg={cardImg}
            projectTitle="Building schools for the less fortunate"
            projectDate="30/07/2023"
            projectTarget="youths"
            currentVolunteerCount="7"
            requiredVolunteerCount="10"
            organiserImg={cardImg}
            organiserName="YouthsForLife"
            organiserType="organisation"
            projectLikeCount="12"
          />
        </div>
      </div>
    </div>
  );
}

export default OrganiserHome;
