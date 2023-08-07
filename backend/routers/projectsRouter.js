const express = require("express");
const router = express.Router();

class ProjectsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAllProjects.bind(this.controller));
    router.get(
      "/:projectId",
      this.controller.getOneProject.bind(this.controller)
    );

    router.post("/", this.controller.addOneProject.bind(this.controller));
    router.put(
      "/:projectId",
      this.controller.updateOneProject.bind(this.controller)
    );

    // TODO: Pending to test delete function
    router.delete(
      "/:projectId",
      this.controller.deleteOneProject.bind(this.controller)
    );

    return router;
  }
}

module.exports = ProjectsRouter;
