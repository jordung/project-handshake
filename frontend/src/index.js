import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-b2yxvc3olwmau6sq.us.auth0.com"
    clientId="jSE9rHHcJCycOhcDVGTU5bsxbacFLEh6"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: process.env.REACT_APP_AUDIENCE,
      scope:
        "read:current_user update:current_user_metadata openid profile email",
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);
