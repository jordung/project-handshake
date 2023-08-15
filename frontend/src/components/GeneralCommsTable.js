import { useState } from "react";
import AddCommsModal from "./AddCommsModal";
import ViewCommsModal from "./ViewCommsModal";

function GeneralCommsTable({
  userDetails,
  projectInformation,
  generalCommunications,
  setGeneralCommunications,
}) {
  const [selectedComms, setSelectedComms] = useState(null);
  function formatCommDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  // console.log(generalCommunications);

  const handleViewComm = (projectId, commsId) => {
    setSelectedComms({
      projectId: projectId,
      commsId: commsId,
      userId: userDetails.id,
    });
    window.viewCommsModal.showModal();
  };

  return (
    <div className="flex flex-col mt-6 w-full">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">General Communications</p>
        {userDetails.id === projectInformation.user.id && (
          <>
            <button
              className="btn btn-neutral btn-sm font-medium text-sm normal-case md:h-10"
              onClick={() => window.addCommunicationsModal.showModal()}
              disabled={new Date(projectInformation.startDate) < new Date()}
            >
              Add
            </button>

            {/* Add Communications Modal */}
            <AddCommsModal
              projectInformation={projectInformation}
              setGeneralCommunications={setGeneralCommunications}
              userDetails={userDetails}
            />
          </>
        )}
      </div>
      <div className="overflow-auto h-96 mt-2 rounded-xl shadow-xl">
        <table className="table table-xs rounded-xl table-pin-rows">
          <thead className="h-10 rounded-t-xl">
            <tr>
              <th className="font-normal bg-primary text-white"></th>
              <th className="font-normal bg-primary text-white">Title</th>
              <th className="font-normal bg-primary text-white">Comments</th>
              <th className="font-normal bg-primary text-white">Date</th>
            </tr>
          </thead>
          <tbody>
            {generalCommunications.length > 0 ? (
              generalCommunications
                .sort((a, b) => a.id - b.id)
                .map((comm, index) => (
                  <tr
                    key={comm.id}
                    className="h-10 hover:bg-base-100 cursor-pointer transition-all duration-300"
                    onClick={() =>
                      handleViewComm(projectInformation.id, comm.id)
                    }
                  >
                    <th>{index + 1}</th>
                    <td>{comm.title}</td>
                    <td>{comm.comments.length}</td>
                    <td>{formatCommDate(comm.createdAt)}</td>
                  </tr>
                ))
            ) : (
              <tr className="h-10">
                <th></th>
                <td colSpan="3" className="text-primary font-medium">
                  There are currently no communications!
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <ViewCommsModal
          selectedComms={selectedComms}
          projectInformation={projectInformation}
          setGeneralCommunications={setGeneralCommunications}
          userDetails={userDetails}
        />
      </div>
    </div>
  );
}

export default GeneralCommsTable;
