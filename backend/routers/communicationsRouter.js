const express = require("express");
const router = express.Router();

class CommunicationsRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }
  routes() {
    router.get(
      "/:projectId",
      this.controller.getProjectCommunications.bind(this.controller)
    );

    router.get("/", this.controller.getOneCommunication.bind(this.controller));

    router.post(
      "/",
      this.auth,
      this.controller.addOneCommunication.bind(this.controller)
    );
    // router.delete(
    //   "/",
    //   this.controller.deleteOneCommunication.bind(this.controller)
    // );

    return router;
  }
}

module.exports = CommunicationsRouter;
