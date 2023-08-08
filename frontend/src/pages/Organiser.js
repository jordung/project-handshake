import { useParams } from "react-router-dom";

function Organiser() {
  const { id } = useParams();

  return (
    <div>
      <p>organiser {id}</p>
      <p>organiser {id}</p>
      <p>organiser {id}</p>
      <p>organiser {id}</p>
      <p>organiser {id}</p>
      <p>organiser {id}</p>
      <p>organiser {id}</p>
      <p>organiser {id}</p>
      <p>organiser {id}</p>
      <p>organiser {id}</p>
    </div>
  );
}

export default Organiser;
