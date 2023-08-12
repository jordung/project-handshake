const express = require("express");
const router = express.Router();

class CommunicationsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get(
      "/:projectId",
      this.controller.getProjectCommunications.bind(this.controller)
    );

    router.post("/", this.controller.addOneCommunication.bind(this.controller));
    // router.delete(
    //   "/",
    //   this.controller.deleteOneCommunication.bind(this.controller)
    // );

    return router;
  }
}

module.exports = CommunicationsRouter;
