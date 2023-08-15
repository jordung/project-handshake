const express = require("express");
const router = express.Router();

class PostRegistrationRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }
  routes() {
    router.put(
      "/",
      this.auth,
      this.controller.updateVolunteerRegistration.bind(this.controller)
    );

    return router;
  }
}

module.exports = PostRegistrationRouter;
