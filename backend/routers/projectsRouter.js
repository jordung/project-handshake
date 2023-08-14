const express = require("express");
const router = express.Router();

class ProjectsRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }

  routes() {
    router.get("/", this.controller.getAllProjects.bind(this.controller));

    // TODO: to include this.auth in getOneProject
    // * TESTING!!!!
    // router.get(
    //   "/:projectId",
    //   this.auth,
    //   this.controller.getOneProject.bind(this.controller)
    // );

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

    // TODO: add auth to delete!!!!
    // TODO: Pending to test delete function
    router.delete(
      "/:projectId",
      this.controller.deleteOneProject.bind(this.controller)
    );

    return router;
  }
}

module.exports = ProjectsRouter;

// // Add a separate method for unauthenticated users
// getUnauthenticatedProject(req, res, next) {
//   // Skip authentication for unauthenticated users
//   return next();
// }
