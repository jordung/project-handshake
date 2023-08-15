const express = require("express");
const router = express.Router();

class ProjectsRegistrationRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }
  routes() {
    router.post(
      "/",
      this.auth,
      this.controller.joinProject.bind(this.controller)
    );
    router.delete(
      "/:projectId",
      this.auth,
      this.controller.withdrawProject.bind(this.controller)
    );

    return router;
  }
}

module.exports = ProjectsRegistrationRouter;
