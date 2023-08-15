const express = require("express");
const router = express.Router();

class VolunteersRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get(
      "/",
      this.controller.getAllVolunteersProjects.bind(this.controller)
    );
    router.get(
      "/:userId",
      this.controller.getProjectsTimeline.bind(this.controller)
    );

    return router;
  }
}

module.exports = VolunteersRouter;
