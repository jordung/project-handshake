const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }
  routes() {
    router.get("/all", this.controller.getAllUsers.bind(this.controller));
    router.get("/", this.controller.getOneUser.bind(this.controller));

    router.post(
      "/",
      this.auth,
      this.controller.addOneUser.bind(this.controller)
    );
    router.put(
      "/:userId",
      this.auth,
      this.controller.updateOneUser.bind(this.controller)
    );

    router.get(
      "/organisers",
      this.controller.getAllOrganisers.bind(this.controller)
    );
    router.get(
      "/organiser/:userId",
      this.controller.getOneOrganiser.bind(this.controller)
    );

    // TODO: add auth!!!
    // TODO: UPDATE DELETE FUNCTION [WIP]
    router.delete(
      "/:userId",
      this.controller.deleteOneUser.bind(this.controller)
    );

    return router;
  }
}

module.exports = UsersRouter;
