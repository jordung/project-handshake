const BaseController = require("./baseController");

class CommentsController extends BaseController {
  constructor({ user, project, volunteer_project, communication, comment }) {
    super(comment);

    this.user = user;
    this.project = project;
    this.volunteer_project = volunteer_project;
    this.communication = communication;
    this.comment = comment;
  }

  async getAllCommsComments(req, res) {
    const { commsId } = req.params;
    try {
      const result = await this.model.findAll({
        where: { communicationId: commsId },
        include: [
          {
            model: this.user,
            attributes: ["id", "name", "profileUrl"],
          },
        ],
      });
      return res.status(200).json({
        success: true,
        data: result,
        msg: "Success: retrieved comments!",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to retrieve comments.",
      });
    }
  }

  // only registered volunteers and project organiser can add comments
  async addOneComment(req, res) {
    const { userId, projectId, commsId, text } = req.body;

    try {
      const project = await this.project.findByPk(projectId);

      const registeredVolunteer = await this.volunteer_project.findOne({
        where: { userId: userId, projectId: projectId },
      });

      if (project.userId === parseInt(userId) || registeredVolunteer) {
        await this.model.create({
          userId: userId,
          communicationId: commsId,
          text: text,
        });

        const result = await this.model.findAll({
          where: { communicationId: commsId },
          include: [
            {
              model: this.user,
              attributes: ["id", "name", "profileUrl"],
            },
          ],
        });

        return res.status(200).json({
          success: true,
          data: result,
          msg: "Success: new comment added!",
        });
      } else {
        return res.status(400).json({
          error: true,
          msg: "Error: only registered volunteers or project organiser can add a comment.",
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to add new comment.",
      });
    }
  }

  async deleteOneComment(req, res) {
    const { userId, commentId, commsId } = req.body;
    try {
      await this.model.destroy({
        where: { userId: userId, id: commentId },
      });

      const result = await this.model.findAll({
        where: { communicationId: commsId },
        include: [
          {
            model: this.user,
            attributes: ["id", "name", "profileUrl"],
          },
        ],
      });

      return res.status(200).json({
        success: true,
        data: result,
        msg: "Success: comment deleted!",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to delete comment.",
      });
    }
  }
}

module.exports = CommentsController;
