import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";

function Project() {
  const { id } = useParams();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const getProjectInformation = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_DB_API}/projects/${id}`
      );
    };
  });

  if (pageLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <p>project {id}</p>
      <p>project {id}</p>
      <p>project {id}</p>
      <p>project {id}</p>
      <p>project {id}</p>
      <p>project {id}</p>
      <p>project {id}</p>
      <p>project {id}</p>
      <p>project {id}</p>
      <p>project {id}</p>
    </div>
  );
}

export default Project;
