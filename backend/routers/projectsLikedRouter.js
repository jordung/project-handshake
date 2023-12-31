const express = require("express");
const router = express.Router();

class ProjectsLikedRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }
  routes() {
    router.get(
      "/:userId",
      this.controller.getVolunteerLikedProjects.bind(this.controller)
    );

    router.post(
      "/",
      this.auth,
      this.controller.addNewLikedProject.bind(this.controller)
    );

    router.delete(
      "/",
      this.auth,
      this.controller.unlikeOneProject.bind(this.controller)
    );

    return router;
  }
}

module.exports = ProjectsLikedRouter;
