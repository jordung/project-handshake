import axios from "axios";
import { useEffect, useState } from "react";
import ProfileProjectCard from "./ProfileProjectCard";
import {
  formatDateTime,
  getOrganiserTypeDisplay,
} from "../utils/formatInformation";
import { FaCanadianMapleLeaf } from "react-icons/fa6";

function PreviewVolunteerModal({ previewVolunteerInfo }) {
  const [previewVolunteerInformation, setPreviewVolunteerInformation] =
    useState([]);
  const [totalHoursClocked, setTotalHoursClocked] = useState("");
  const [latestProjects, setLatestProjects] = useState("");

  useEffect(() => {
    const getPreviewVolunteerInformation = async () => {
      try {
        const volunteerGeneralInfo = await axios.get(
          `${process.env.REACT_APP_DB_API}/users`,
          {
            params: {
              email: previewVolunteerInfo.volunteerEmail,
            },
          }
        );
        const volunteerProjectsInfo = await axios.get(
          `${process.env.REACT_APP_DB_API}/volunteers/${previewVolunteerInfo.volunteerId}`
        );
        Promise.all([
          volunteerGeneralInfo.data.data,
          volunteerProjectsInfo.data.data,
        ]).then((values) => {
          setPreviewVolunteerInformation(values[0]);
          setTotalHoursClocked(values[1].totalHoursClocked);
          setLatestProjects(values[1].latestProjects);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getPreviewVolunteerInformation();
  }, [previewVolunteerInfo]);

  return (
    <dialog id="previewVolunteerModal" className="modal backdrop-blur-sm">
      <form method="dialog" className="modal-box bg-white">
        <button className="btn btn-sm btn-circle btn-ghost outline-none absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg">Preview Volunteer</h3>
        <div className="flex gap-8 mt-4 justify-between items-start">
          <div className="p-2">
            <p className="font-semibold text-sm">Name</p>
            <p className="my-0 text-sm">{previewVolunteerInformation.name}</p>
            <p className="font-semibold text-sm mt-2">Username</p>
            <p className="my-0 text-sm">
              @{previewVolunteerInformation.username}
            </p>
            <p className="font-semibold text-sm mt-2">Email Address</p>
            <p className="my-0 text-sm">{previewVolunteerInformation.email}</p>
            <p className="font-semibold text-sm mt-2">Phone Number</p>
            <p className="my-0 text-sm">{previewVolunteerInformation.phone}</p>
            <p className="font-semibold text-sm mt-2">Location</p>
            <p className="my-0 text-sm">
              {previewVolunteerInformation.location}
            </p>
          </div>
          <img
            className="h-48 w-48 object-cover rounded-full shadow-xl mr-auto"
            src={previewVolunteerInformation.profileUrl}
            alt="profile"
          />
        </div>
        <div className="px-2">
          <p className="font-semibold text-sm mt-2">Biography</p>
          <p className="my-0 text-sm">
            {previewVolunteerInformation.biography}
          </p>
          <p className="font-semibold text-sm mt-2">
            Number of Hours Volunteered
          </p>
          <p className="my-0 text-sm">{totalHoursClocked}</p>
        </div>
        <div className="mt-4 px-2">
          <p className="font-semibold text-sm mt-2">Latest Projects Joined</p>

          <div className="flex flex-col items-center justify-between mt-2 max-h-[300px] overflow-y-scroll">
            {latestProjects.length > 0 ? (
              latestProjects.map((project) => (
                <ProfileProjectCard
                  key={project.project.id}
                  projectId={project.project.id}
                  projectTitle={project.project.title}
                  projectDate={formatDateTime(
                    project.project.startDate,
                    project.project.endDate
                  )}
                  projectLocation={project.project.location}
                  organiserId={project.project.user.id}
                  organiserImg={project.project.user.profileUrl}
                  organiserName={project.project.user.name}
                  organiserType={getOrganiserTypeDisplay(
                    project.project.user.usertypeId
                  )}
                />
              ))
            ) : (
              <p className="mt-2 text-sm font-medium text-neutral italic min-w-full">
                <FaCanadianMapleLeaf className="h-4 w-4 inline-block text-secondary" />{" "}
                Join a project now!
              </p>
            )}
          </div>
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default PreviewVolunteerModal;
