export const getToken = async (getAccessTokenSilently) => {
  const accessToken = await getAccessTokenSilently({
    authorizationParams: {
      audience: process.env.REACT_APP_AUDIENCE,
      scope: "read:current_user",
    },
  });
  return accessToken;
};
