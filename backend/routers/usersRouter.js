const express = require("express");
const router = express.Router();

class UsersRouter {
  constructor(controller, auth) {
    this.controller = controller;
    // this.auth = auth;
  }
  routes() {
    router.get("/", this.controller.getAllUsers.bind(this.controller));
    router.get("/:userId", this.controller.getOneUser.bind(this.controller));
    router.post("/", this.controller.addOneUser.bind(this.controller));
    router.put("/:userId", this.controller.updateOneUser.bind(this.controller));

    // ? Check with Jordan!!!
    router.get("/usertype", this.controller.getUserType.bind(this.controller));

    // TODO: UPDATE DELETE FUNCTION [WIP]
    router.delete(
      "/:userId",
      this.controller.deleteOneUser.bind(this.controller)
    );

    return router;
  }
}

module.exports = UsersRouter;
