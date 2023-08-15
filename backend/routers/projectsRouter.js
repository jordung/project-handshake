const express = require("express");
const router = express.Router();

class ProjectsRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }

  routes() {
    router.get("/", this.controller.getAllProjects.bind(this.controller));

    router.get(
      "/:projectId",
      this.controller.getOneProject.bind(this.controller)
    );

    router.post(
      "/",
      this.auth,
      this.controller.addOneProject.bind(this.controller)
    );

    router.put(
      "/:projectId",
      this.auth,
      this.controller.updateOneProject.bind(this.controller)
    );

    router.delete(
      "/:projectId",
      this.auth,
      this.controller.deleteOneProject.bind(this.controller)
    );

    return router;
  }
}

module.exports = ProjectsRouter;
