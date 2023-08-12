const express = require("express");
const router = express.Router();

class UnauthenticatedUsersRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getUnauthProjects.bind(this.controller));
    router.get(
      "/:projectId",
      this.controller.getUnauthOneProject.bind(this.controller)
    );

    return router;
  }
}

module.exports = UnauthenticatedUsersRouter;
