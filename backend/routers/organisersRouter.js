const express = require("express");
const router = express.Router();

class OrganisersRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get(
      "/:userId",
      this.controller.getOrgProjectsTimeline.bind(this.controller)
    );

    return router;
  }
}

module.exports = OrganisersRouter;
