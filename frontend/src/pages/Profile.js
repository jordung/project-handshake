import { useAuth0 } from "@auth0/auth0-react";
import VolunteerProfile from "../components/VolunteerProfile";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import OrganiserProfile from "../components/OrganiserProfile";

function Profile() {
  // TODO: update UI once the rest of the information confirmed
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [pageLoading, setPageLoading] = useState(true);
  const [userDetails, setUserDetails] = useState([]);

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
      })
      .catch((error) => {
        if (error.status === 404) {
          console.log("404");
        }
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setPageLoading(false);
    } else {
      loginWithRedirect();
    }
  }, [isAuthenticated, user, loginWithRedirect]);

  if (pageLoading) {
    return <Spinner />;
  }

  // return VolunteerProfile if userDetail.usertypeId === 1
  if (userDetails && userDetails.usertypeId === 1) {
    return (
      <VolunteerProfile
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
    );
  } else if (
    // else if userDetail.usertypeId === 2 or 3, return OrganiserProfile
    userDetails &&
    (userDetails.usertypeId === 2 || userDetails.usertypeId === 3)
  ) {
    return (
      <OrganiserProfile
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
    );
  }
}

export default Profile;
