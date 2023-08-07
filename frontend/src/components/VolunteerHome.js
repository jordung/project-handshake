import volunteerHomeImg from "../assets/home/volunteerhome.png";
import cardImg from "../assets/home/cardImg.avif";
import ProjectCard from "./ProjectCard";

function VolunteerHome() {
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
        <div className="flex flex-col justify-center my-4 mx-8 prose md:text-center">
          <h2 className="mb-0">Ready To Make A Difference?</h2>
          <p className="mt-0 text-sm font-medium">
            Small Acts, Big Impact. Make a Difference Today.
          </p>
        </div>

        {/* Projects Section */}
        <div className="flex flex-col mx-4 md:flex-row md:flex-wrap md:gap-3 md:justify-center">
          <ProjectCard
            projectImg={cardImg}
            organiserImg={cardImg}
            projectTitle="Building schools for the less fortunate youths!"
            projectDate="30/7/2023"
            projectTarget="youths"
            currentVolunteerCount="7"
            requiredVolunteerCount="10"
            organiserName="YouthsForLife"
            organiserType="team"
            projectLikeCount="55"
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

export default VolunteerHome;
