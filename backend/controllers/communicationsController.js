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
            include: [
              {
                model: this.user,
                attributes: ["id", "name", "profileUrl"],
              },
            ],
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
      // check if user = project organiser
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
              include: [
                {
                  model: this.user,
                  attributes: ["id", "name", "profileUrl"],
                },
              ],
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
  async deleteOneCommunication(req, res) {
    const { userId, projectId, commsId } = req.body;
    try {
      // check if user = project organiser
      const communication = await this.model.findOne({
        where: { id: commsId, projectId: projectId },
      });

      if (communication.userId === parseInt(userId)) {
        // delete associated record from the 'comments' (child) table
        await this.comment.destroy({
          where: { communicationId: commsId },
        });

        // delete associated record from 'communications' (parent) table
        await this.model.destroy({
          where: { id: commsId, projectId: projectId },
        });

        const result = await this.model.findAll({
          where: { projectId: projectId },
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
        return res.status(200).json({
          success: true,
          data: result,
          msg: "Success: communication and its associated comments deleted!",
        });
      } else {
        return res.status(400).json({
          error: true,
          msg: "Error: communication can only be deleted by the project organiser.",
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to delete communication.",
      });
    }
  }
}

module.exports = CommunicationsController;
