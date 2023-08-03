import loading from "../assets/loading/loading.gif";

function Spinner() {
  return (
    <div className="absolute h-screen w-screen backdrop-blur-md flex justify-center items-center">
      <img className="h-56" src={loading} alt="spinning" />
    </div>
  );
}

export default Spinner;
