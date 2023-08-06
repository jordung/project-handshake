const express = require("express");
const router = express.Router();

class ProjectsLikedRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get(
      "/:userId",
      this.controller.getVolunteerLikedProjects.bind(this.controller)
    );

    router.post("/", this.controller.addNewLikedProject.bind(this.controller));

    router.delete("/", this.controller.unlikeOneProject.bind(this.controller));

    return router;
  }
}

module.exports = ProjectsLikedRouter;
