const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  // ? to test using the given URL before switching to process.env
  audience: process.env.REACT_APP_AUDIENCE,
  issuerBaseURL: "https://dev-b2yxvc3olwmau6sq.us.auth0.com/",
});

module.exports = checkJwt;
