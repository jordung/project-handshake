import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../components/Spinner";
import VolunteerHome from "../components/VolunteerHome";
import OrganiserHome from "../components/OrganiserHome";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  // TODO: Call API to figure out if user is volunteer/organiser and render out accordingly
  const { user } = useAuth0();
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);

  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_DB_API}/users`,
        {
          params: {
            email: user.email,
          },
        }
      );
      return response;
    };
    getUserDetails()
      .then((response) => {
        setUserDetails(response.data.data);
        setPageLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          navigate("/setprofile");
        } else {
          console.log(error);
        }
      });
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, []);

  if (pageLoading || isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex pt-20 justify-center items-center w-screen md:pt-10">
      {userDetails && userDetails.usertypeId === 1 ? (
        <VolunteerHome userDetails={userDetails} />
      ) : (
        <OrganiserHome />
      )}
    </div>
  );
}

export default Home;
