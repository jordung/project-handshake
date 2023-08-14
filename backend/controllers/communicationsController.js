const BaseController = require("./baseController");

class CommunicationsController extends BaseController {
  constructor({ user, project, communication, comment }) {
    super(communication);

    this.user = user;
    this.project = project;
    this.communication = communication;
    this.comment = comment;
  }

  async getProjectCommunications(req, res) {
    const { projectId } = req.params;
    try {
      const communications = await this.model.findAll({
        where: { projectId: projectId },
        include: [
          {
            model: this.comment,
          },
        ],
      });
      return res.status(200).json({
        success: true,
        data: communications,
        msg: "Success: all communications tied to this projectId has been retrieved!",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to retrieve all communications tied to this projectId.",
      });
    }
  }

  // only registered volunteers and project organiser can view communications
  async getOneCommunication(req, res) {
    const { projectId, commsId } = req.query;

    try {
      const communication = await this.model.findOne({
        where: { projectId: projectId, id: commsId },
        include: [
          {
            model: this.comment,
            include: [
              {
                model: this.user,
                attributes: ["id", "name", "profileUrl"],
              },
            ],
          },
        ],
      });

      if (!communication) {
        return res.status(404).json({
          error: true,
          msg: "Error: communication not found.",
        });
      }
      return res.status(200).json({
        success: true,
        data: communication,
        msg: "Success: communication retrieved successfully!",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to retrieve communication.",
      });
    }
  }

  // only project organiser can add new communications
  async addOneCommunication(req, res) {
    const { userId, projectId, title, description } = req.body;

    try {
      const project = await this.project.findByPk(projectId);

      if (project.userId === parseInt(userId)) {
        await this.model.create({
          userId: userId,
          projectId: projectId,
          title: title,
          description: description,
        });

        const result = await this.model.findAll({
          where: { projectId: projectId },
          include: [
            {
              model: this.comment,
            },
          ],
        });

        return res.status(200).json({
          success: true,
          data: result,
          msg: "Success: new communication added!",
        });
      } else {
        return res.status(400).json({
          error: true,
          msg: "Error: userId does not belong to the project organiser.",
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to add new communication.",
      });
    }
  }

  // TODO: to remind jordan to add "data: {}"
  // async deleteOneCommunication(req, res) {
  //   const { userId, projectId, commsId } = req.body;
  //   try {
  //     const communication = await this.model.findOne({
  //       where: { id: commsId, projectId: projectId },
  //     });

  //     const user = await this.model.findByPk(userId);

  //     // check if user exists
  //     if (!user) {
  //       return res.status(404).json({
  //         error: true,
  //         msg: "Error: user not found.",
  //       });
  //     }

  //     console.log("user.userId", user.userId);
  //     console.log("userId", userId);

  //     if (user.userId === parseInt(userId)) {
  //       await this.comments.destroy({
  //         where: { communicationId: communication.id },
  //       });
  //       // delete associated record from the 'volunteers' (child) table
  //       await this.model.destroy({
  //         where: { userId: userId, projectId: projectId },
  //       });
  //     } else {
  //       return res.status(400).json({
  //         error: true,
  //         msg: "Error: comment can only be deleted by the commenter.",
  //       });
  //     }

  //     return res.status(200).json({
  //       success: true,
  //       msg: "Success: comment has been removed!",
  //     });
  //   } catch (error) {
  //     return res.status(400).json({
  //       error: true,
  //       msg: "Error: unable to remove comment.",
  //     });
  //   }
  // }
}

module.exports = CommunicationsController;
