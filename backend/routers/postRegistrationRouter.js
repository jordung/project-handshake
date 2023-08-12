const express = require("express");
const router = express.Router();

class PostRegistrationRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.put(
      "/",
      this.controller.updateVolunteerRegistration.bind(this.controller)
    );

    return router;
  }
}

module.exports = PostRegistrationRouter;
