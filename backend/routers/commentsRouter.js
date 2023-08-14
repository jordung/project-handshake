const express = require("express");
const router = express.Router();

class CommentsRouter {
  constructor(controller, auth) {
    this.controller = controller;
    this.auth = auth;
  }
  routes() {
    router.get(
      "/:commsId",
      this.controller.getAllCommsComments.bind(this.controller)
    );

    router.post(
      "/",
      this.auth,
      this.controller.addOneComment.bind(this.controller)
    );

    router.delete(
      "/",
      this.auth,
      this.controller.deleteOneComment.bind(this.controller)
    );

    return router;
  }
}

module.exports = CommentsRouter;
