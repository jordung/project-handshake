import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: "http://project-handshake.netlify.app/home",
        audience: process.env.REACT_APP_AUDIENCE,
        scope:
          "read:current_user update:current_user_metadata openid profile email",
      }}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);
