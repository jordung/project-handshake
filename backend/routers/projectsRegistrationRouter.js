const express = require("express");
const router = express.Router();

class ProjectsRegistrationRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.post("/", this.controller.joinProject.bind(this.controller));
    router.delete(
      "/:projectId",
      this.controller.withdrawProject.bind(this.controller)
    );

    return router;
  }
}

module.exports = ProjectsRegistrationRouter;
