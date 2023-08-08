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
} from "react-icons/fa6";

function OrganiserProfile({ userDetails }) {
  // TODO: edit profile functionality
  const { isAuthenticated, isLoading } = useAuth0();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
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
        <div className="lg:w-1/6 lg:flex-col lg:justify-center lg:items-center">
          <div className="flex flex-col justify-center items-center mt-8 prose md:min-w-full lg:items-center">
            <img
              className="h-48 w-48 object-cover rounded-full shadow-xl"
              src={userDetails.profileUrl}
              alt="profile"
            />
            <h3 className="my-0">{userDetails.name}</h3>
            <p className="mt-0 font-medium">@{userDetails.username}</p>
          </div>
          <div className="mx-8 md:mx-40 lg:mx-0">
            <h6 className="text-lg font-semibold mt-8">Biography</h6>
            <p className="text-sm">
              {userDetails.biography !== null
                ? userDetails.biography
                : "Welcome to Handshake. The sky transformed from hues of blue to vibrant orange as the sun dipped below the horizon. A gentle breeze rustled the leaves, carrying with it the scent of blooming flowers. Laughter echoed through the park, creating an atmosphere of joy and togetherness among friends and families."}
            </p>
            <h6 className="text-lg font-semibold mt-8">Location</h6>
            <p className="text-sm">{userDetails.location}</p>
          </div>
        </div>
        <div className="mx-8 md:mx-40 lg:mx-0 lg:w-1/2">
          <h6 className="text-lg font-semibold mt-8">Organiser Information</h6>
          {/* Volunteer Information Card */}
          <div className="shadow-lg p-4 rounded-xl mb-8 bg-white">
            <div>
              <p className="font-semibold">Phone Number</p>
              <p className="text-sm">{userDetails.phone}</p>
            </div>
            <div className="mt-8">
              <p className="font-semibold">Email Address</p>
              <p className="text-sm">{userDetails.email}</p>
            </div>
            <div className="mt-8">
              <p className="font-semibold">Website</p>
              <p className="text-sm">
                {userDetails.organiser.website !== null
                  ? userDetails.organiser.website
                  : "NIL"}
              </p>
            </div>
          </div>
          {/* Stats Component */}
          <div className="stats bg-white shadow max-w-full md:min-w-full md:flex ">
            <div className="stat">
              <div className="stat-title text-xs text-neutral font-medium md:text-center">
                Ongoing <br /> Projects
              </div>
              <div className="stat-value text-2xl flex items-center gap-3 md:justify-center md:text-3xl">
                <span className="text-primary">8</span>
                <FaRegHandPeace className="h-6 w-6 text-neutral" />
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-xs text-neutral font-medium md:text-center">
                Total <br /> Projects
              </div>
              <div className="stat-value text-2xl flex items-center gap-3 md:justify-center md:text-3xl">
                <span className="text-primary">80</span>
                <FaRegHospital className="h-6 w-6 text-neutral" />
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-xs text-neutral font-medium md:text-center">
                Total <br /> Volunteers
              </div>
              <div className="stat-value text-2xl flex items-center gap-3 md:justify-center md:text-3xl">
                <span className="text-primary">128</span>
                <FaRegFaceLaughWink className="h-6 w-6 text-neutral" />
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

export default OrganiserProfile;
