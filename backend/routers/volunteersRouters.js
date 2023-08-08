const express = require("express");
const router = express.Router();

class VolunteersRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get(
      "/:userId",
      this.controller.getVolunteerProjects.bind(this.controller)
    );

    return router;
  }
}

module.exports = VolunteersRouter;
