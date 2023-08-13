import axios from "axios";
import {
  getVolunteerRole,
  getVolunteerStatus,
} from "../utils/formatInformation";
import PreviewVolunteerModal from "./PreviewVolunteerModal";
import { LiaIdCardSolid } from "react-icons/lia";
import { useState } from "react";

function VolunteerListTable({ projectInformation, setProjectInformation }) {
  const [previewVolunteerInfo, setPreviewVolunteerInfo] = useState(null);

  const handleUpdateVolunteerRole = async (updatedRole, volunteerId) => {
    console.log({
      updatedRole: parseInt(updatedRole),
      volunteerId: volunteerId,
      projectId: projectInformation.id,
    });

    const updatedProjectInformation = await axios.put(
      `${process.env.REACT_APP_DB_API}/admin`,
      {
        updatedRole: updatedRole,
        volunteerId: volunteerId,
        projectId: projectInformation.id,
      },
      {
        headers: {
          Authorization: `Bearer + ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    setProjectInformation(updatedProjectInformation.data.data);
  };

  const handleUpdateVolunteerStatus = async (updatedStatus, volunteerId) => {
    const updatedProjectInformation = await axios.put(
      `${process.env.REACT_APP_DB_API}/admin`,
      {
        updatedStatus: parseInt(updatedStatus),
        volunteerId: volunteerId,
        projectId: projectInformation.id,
      },
      {
        headers: {
          Authorization: `Bearer + ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    setProjectInformation(updatedProjectInformation.data.data);
  };

  const handlePreviewVolunteer = (volunteerEmail, volunteerId) => {
    setPreviewVolunteerInfo({
      volunteerEmail: volunteerEmail,
      volunteerId: volunteerId,
    });
    window.previewVolunteerModal.showModal();
  };

  return (
    <>
      <p className="text-lg font-semibold mt-4">Volunteer List</p>

      <div className="overflow-auto h-96 rounded-xl shadow-xl">
        <table className="table table-xs rounded-xl table-pin-rows">
          <thead className="h-10 rounded-t-xl">
            <tr>
              <th className="font-normal bg-primary text-white"></th>
              <th className="font-normal bg-primary text-white">Name</th>
              <th className="font-normal bg-primary text-white">
                Phone Number
              </th>
              <th className="font-normal bg-primary text-white">
                Email Address
              </th>
              <th className="font-normal bg-primary text-white">Role</th>
              <th className="font-normal bg-primary text-white">Status</th>
              <th className="font-normal bg-primary text-white"></th>
            </tr>
          </thead>
          <tbody>
            {projectInformation.projectVolunteers.length > 0 ? (
              projectInformation.projectVolunteers
                .sort((a, b) => a.user.name.localeCompare(b.user.name))
                .map((volunteer, index) => (
                  <tr key={volunteer.user.id} className="h-10">
                    <th>{index + 1}</th>
                    <td>{volunteer.user.name}</td>
                    <td>{volunteer.user.phone}</td>
                    <td>{volunteer.user.email}</td>
                    {new Date(projectInformation.startDate) < new Date() ? (
                      <td>{getVolunteerRole(volunteer.role.id)}</td>
                    ) : (
                      <td>
                        <select
                          className={`w-30 select select-xs focus:outline-none ${
                            (volunteer.role.id === 2 && "text-info") ||
                            (volunteer.role.id === 3 && "text-warning") ||
                            (volunteer.role.id === 4 && "text-primary")
                          }`}
                          value={volunteer.role.id || "0"}
                          onChange={(e) =>
                            handleUpdateVolunteerRole(
                              e.target.value,
                              volunteer.user.id
                            )
                          }
                          disabled={volunteer.status.id === 3}
                        >
                          <option value="1">Unassigned</option>
                          <option value="2">Committee</option>
                          <option value="3">Facilitator</option>
                          <option value="4">Participant</option>
                        </select>
                      </td>
                    )}
                    {new Date(projectInformation.startDate) < new Date() ? (
                      <td>{getVolunteerStatus(volunteer.status.id)}</td>
                    ) : (
                      <td>
                        <select
                          className={`w-30 select select-xs focus:outline-none ${
                            (volunteer.status.id === 1 && "text-warning") ||
                            (volunteer.status.id === 2 && "text-primary") ||
                            (volunteer.status.id === 3 && "text-error")
                          }`}
                          value={volunteer.status.id}
                          onChange={(e) =>
                            handleUpdateVolunteerStatus(
                              e.target.value,
                              volunteer.user.id
                            )
                          }
                        >
                          <option value="1">Pending</option>
                          <option value="2">Confirmed</option>
                          <option value="3">Rejected</option>
                        </select>
                      </td>
                    )}
                    <td>
                      <LiaIdCardSolid
                        className="h-6 w-6 cursor-pointer text-neutral hover:text-primary transition-all duration-300"
                        onClick={() =>
                          handlePreviewVolunteer(
                            volunteer.user.email,
                            volunteer.user.id
                          )
                        }
                      />
                    </td>
                  </tr>
                ))
            ) : (
              <tr className="h-10">
                <th></th>
                <td colSpan="3" className="text-primary font-medium">
                  There are currently no volunteers!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <PreviewVolunteerModal previewVolunteerInfo={previewVolunteerInfo} />
    </>
  );
}

export default VolunteerListTable;
