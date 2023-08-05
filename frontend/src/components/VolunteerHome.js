import volunteerHomeImg from "../assets/home/volunteerhome.png";
import cardImg from "../assets/home/cardImg.avif";
import ProjectCard from "./ProjectCard";

function VolunteerHome() {
  // TODO: fix tablet/desktop view

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
        <div className="flex flex-col justify-center items-center m-4 prose">
          <h2 className="mb-0">Ready To Make A Difference?</h2>
          <p className="mt-0 text-sm font-medium">
            Small Acts, Big Impact. Make a Difference Today.
          </p>
        </div>

        {/* Projects Section */}
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center lg:w-full xl:w-2/3">
          <ProjectCard cardImg={cardImg} profileImg={cardImg} />
          <ProjectCard cardImg={cardImg} profileImg={cardImg} />
          <ProjectCard cardImg={cardImg} profileImg={cardImg} />
          <ProjectCard cardImg={cardImg} profileImg={cardImg} />
          <ProjectCard cardImg={cardImg} profileImg={cardImg} />
          <ProjectCard cardImg={cardImg} profileImg={cardImg} />
          <ProjectCard cardImg={cardImg} profileImg={cardImg} />
          <ProjectCard cardImg={cardImg} profileImg={cardImg} />
        </div>
      </div>
    </div>
  );
}

export default VolunteerHome;
