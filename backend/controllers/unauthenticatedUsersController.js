const BaseController = require("./baseController");

// TODO: change all to "liked" instead of saved
class UnauthenticatedUsersController extends BaseController {
  constructor({
    user,
    target_comm,
    project,
    volunteer_project,
    liked_project,
  }) {
    super(project);

    this.user = user;
    this.target_comm = target_comm;
    this.project = project;
    this.volunteer_project = volunteer_project;
    this.liked_project = liked_project;
  }

  async getUnauthProjects(req, res) {
    try {
      let projects = await this.model.findAll({
        include: [
          {
            model: this.user,
            attributes: ["name", "usertypeId", "profileUrl"],
          },
          {
            model: this.target_comm,
            attributes: ["name"],
          },
        ],
      });

      const totalCount = projects.map(async (project) => {
        // count the total number of likes the project has received.
        const likes = await this.liked_project.count({
          where: { projectId: project.id },
        });

        // count the total number of registered volunteers
        const volunteers = await this.volunteer_project.count({
          where: { projectId: project.id },
        });
        return {
          ...project.toJSON(),
          likesCount: likes,
          volunteersCount: volunteers,
        };
      });

      const result = await Promise.all(totalCount);

      return res.status(200).json({
        success: true,
        data: result,
        msg: "Success: all projects retrieved!",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to retrieve all projects.",
      });
    }
  }

  // ? option 1: create a new router for unauthenticated users
  async getUnauthOneProject(req, res) {
    const { projectId } = req.params;
    try {
      // for all users: can view project details.
      const project = await this.model.findByPk(projectId, {
        include: [
          {
            model: this.target_comm,
            attributes: ["name"],
          },
          {
            model: this.user,
          },
        ],
      });

      const volunteersCount = await this.volunteer_project.count({
        where: { projectId: projectId },
      });

      // count the total number of likes the project has received
      const likesCount = await this.liked_project.count({
        where: { projectId: projectId },
      });

      if (!project) {
        return res.status(404).json({
          error: true,
          msg: "Error: project not found.",
        });
      }
      // for unauthenticated users: display project details only.
      return res.status(200).json({
        success: true,
        data: { ...project.toJSON(), likesCount, volunteersCount },
        msg: "Success: volunteer is not registered for this project!",
      });
    } catch {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to retrieve project data.",
      });
    }
  }
}

module.exports = UnauthenticatedUsersController;
