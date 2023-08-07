const BaseController = require("./baseController");

// TODO: change all to "liked" instead of saved
class ProjectsLikedController extends BaseController {
  constructor({ user, project, liked_project }) {
    super(liked_project);

    this.user = user;
    this.project = project;
    this.liked_project = liked_project;
  }

  // API call returns one volunteer's liked list.
  async getVolunteerLikedProjects(req, res) {
    const { userId } = req.params;
    try {
      const user = await this.user.findByPk(userId);

      if (user.usertypeId === 1) {
        const projectsLiked = await this.model.findAll({
          where: { userId: userId },
          include: [
            {
              model: this.project,
              attributes: ["title"],
              include: [
                {
                  model: this.user,
                  attributes: ["name", "usertypeId"],
                },
              ],
            },
          ],
        });

        return res.status(200).json({
          success: true,
          data: projectsLiked,
          msg: "Success: all projects liked by the volunteer has been retrieved!",
        });
      } else {
        return res.status(400).json({
          error: true,
          msg: "Error: this request is only applicable for volunteers.",
        });
      }
    } catch {
      return res.status(404).json({
        error: true,
        msg: "Error: user not found.",
      });
    }
  }

  async addNewLikedProject(req, res) {
    const { userId, projectId } = req.body;

    try {
      const user = await this.user.findByPk(userId);

      if (user.usertypeId === 1) {
        // check if the project is already liked by the user
        const currentLikedList = await this.model.findOne({
          where: { userId: userId, projectId: projectId },
        });

        if (currentLikedList) {
          return res.status(400).json({
            error: true,
            msg: `Error: project id #${projectId} has already been liked by the volunteer.`,
          });
        } else {
          const projectsLiked = await this.model.create({
            userId: userId,
            projectId: projectId,
          });

          return res.status(200).json({
            success: true,
            data: projectsLiked,
            msg: `Success: project id #${projectId} added to the volunteer's liked list!`,
          });
        }
      } else {
        return res.status(400).json({
          error: true,
          msg: "Error: this request is only applicable for volunteers.",
        });
      }
    } catch {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to add project to liked list.",
      });
    }
  }

  async unlikeOneProject(req, res) {
    const { userId, projectId } = req.body;

    try {
      const user = await this.user.findByPk(userId);

      if (user.usertypeId === 1) {
        // check if the project exists in volunteer's liked list.
        const currentLikedList = await this.model.findOne({
          where: { userId: userId, projectId: projectId },
        });

        if (!currentLikedList) {
          return res.status(400).json({
            error: true,
            msg: "Error: volunteer has not liked this project yet.",
          });
        } else {
          await this.model.destroy({
            where: { userId: userId, projectId: projectId },
          });

          const updatedList = await this.model.findAll({
            where: { userId: userId },
            include: [
              {
                model: this.project,
                attributes: ["title"],
                include: [
                  {
                    model: this.user,
                    attributes: ["name", "usertypeId"],
                  },
                ],
              },
            ],
          });

          return res.status(200).json({
            success: true,
            data: updatedList,
            msg: `Success: project id #${projectId} has been unliked!`,
          });
        }
      } else {
        return res.status(400).json({
          error: true,
          msg: "Error: this request is only applicable for volunteers.",
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to unlike the project",
      });
    }
  }
}

module.exports = ProjectsLikedController;
