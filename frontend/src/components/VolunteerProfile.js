import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ProfileProjectCard from "../components/ProfileProjectCard";
import Tabs from "../components/Tabs";
import profilePageImg from "../assets/profile/wave.svg";

function VolunteerProfile() {
  // TODO: edit profile functionality
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // TODO: call api for profile information here - make it dynamic!
    if (isAuthenticated) {
      setPageLoading(false);
    }
  }, [isAuthenticated]);

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
        <div className="lg:w-1/4 lg:flex-col lg:justify-center lg:items-center">
          <div className="flex flex-col justify-center items-center mt-8 prose md:min-w-full lg:items-center">
            <img
              className="h-48 w-48 object-cover rounded-full shadow-xl"
              src={user.picture}
              alt="profile"
            />
            <h3 className="my-0">Handshake</h3>
            <p className="mt-0 font-medium">@handshake</p>
          </div>
          <div className="mx-8 md:mx-40 lg:mx-0">
            <h6 className="text-lg font-semibold mt-8">Biography</h6>
            <p className="text-sm">
              Skateboarder, coffee addict, audiophile, and avid graphic
              designer. Let’s volunteer together to make this world a better
              place.
            </p>
            <h6 className="text-lg font-semibold mt-8">Phone Number</h6>
            <p className="text-sm">+65 9123 4567</p>
            <h6 className="text-lg font-semibold mt-8">Location</h6>
            <p className="text-sm">Singapore</p>
            <h6 className="text-lg font-semibold mt-8">Interests</h6>
            <div className="flex gap-2 mt-1">
              <span className="badge badge-accent uppercase py-3 text-xs font-semibold text-neutral">
                youths
              </span>
            </div>
          </div>
        </div>
        <div className="mx-8 md:mx-40 lg:mx-0 lg:w-1/2">
          <h6 className="text-lg font-semibold mt-8">Volunteer Information</h6>
          {/* Volunteer Information Card */}
          <div className="shadow-lg p-4 rounded-xl mb-8 bg-white">
            <div>
              <p className="font-semibold">Number of Hours Clocked</p>
              <p className="text-sm">412</p>
            </div>
            <div className="mt-8">
              <p className="font-semibold">Latest Projects Joined</p>
              <div className="flex flex-col items-center justify-between mx-1 mt-1">
                {/* Profile Project Card */}
                <ProfileProjectCard
                  projectTitle="Building school for youths"
                  projectDate="24/7/2023"
                  organiserImg="https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2864&q=80"
                  organiserName="YouthsForLife"
                  organiserType="team"
                />
                <ProfileProjectCard
                  projectTitle="Grocery shopping with the senior citizens!"
                  projectDate="28/8/2023"
                  organiserImg="https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2864&q=80"
                  organiserName="SeniorsOfSG"
                  organiserType="organisation"
                />
              </div>
            </div>
          </div>
          {/* Upcoming Projects */}
          <h6 className="text-lg font-semibold mt-8">
            Upcoming/Saved Projects
          </h6>
          <div className="shadow-lg p-4 rounded-xl mb-8 bg-white">
            <div className="flex flex-col items-center justify-between mx-1 mt-1">
              <Tabs>
                <Tabs.Tab tabLabel="Upcoming">
                  <ProfileProjectCard
                    projectTitle="Upcoming Project 1"
                    projectDate="24/7/2023"
                    organiserImg="https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2864&q=80"
                    organiserName="YouthsForLife"
                    organiserType="team"
                  />
                  <ProfileProjectCard
                    projectTitle="Upcoming Project 2"
                    projectDate="28/8/2023"
                    organiserImg="https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2864&q=80"
                    organiserName="SeniorsOfSG"
                    organiserType="organisation"
                  />
                  <ProfileProjectCard
                    projectTitle="Upcoming Project 2"
                    projectDate="28/8/2023"
                    organiserImg="https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2864&q=80"
                    organiserName="SeniorsOfSG"
                    organiserType="organisation"
                  />
                  <ProfileProjectCard
                    projectTitle="Upcoming Project 2"
                    projectDate="28/8/2023"
                    organiserImg="https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2864&q=80"
                    organiserName="SeniorsOfSG"
                    organiserType="organisation"
                  />
                  <ProfileProjectCard
                    projectTitle="Upcoming Project 2"
                    projectDate="28/8/2023"
                    organiserImg="https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2864&q=80"
                    organiserName="SeniorsOfSG"
                    organiserType="organisation"
                  />
                </Tabs.Tab>
                <Tabs.Tab tabLabel="Saved">
                  <ProfileProjectCard
                    projectTitle="Saved Project 1"
                    projectDate="24/7/2023"
                    organiserImg="https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2864&q=80"
                    organiserName="YouthsForLife"
                    organiserType="team"
                  />
                  <ProfileProjectCard
                    projectTitle="Saved Project 2"
                    projectDate="28/8/2023"
                    organiserImg="https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2864&q=80"
                    organiserName="SeniorsOfSG"
                    organiserType="organisation"
                  />
                </Tabs.Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VolunteerProfile;
