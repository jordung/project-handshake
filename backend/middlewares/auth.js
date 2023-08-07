const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
});

module.exports = checkJwt;
