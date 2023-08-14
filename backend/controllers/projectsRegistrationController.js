const BaseController = require("./baseController");

class ProjectsRegistrationController extends BaseController {
  constructor({
    user,
    target_comm,
    project,
    volunteer_project,
    liked_project,
    status,
    role,
  }) {
    super(volunteer_project);

    this.user = user;
    this.target_comm = target_comm;
    this.project = project;
    this.volunteer_project = volunteer_project;
    this.liked_project = liked_project;
    this.status = status;
    this.role = role;
  }

  // join project = display view for registered volunteers //
  async joinProject(req, res) {
    const { userId, projectId } = req.body;

    try {
      const user = await this.user.findByPk(userId);

      if (user.usertypeId === 1) {
        // check if volunteer has already joined the project
        const alreadyRegistered = await this.model.findOne({
          where: { userId: userId, projectId: projectId },
        });
        if (alreadyRegistered) {
          return res.status(400).json({
            error: true,
            msg: "Error: volunteer has already joined this project.",
          });
        } else {
          const joinProject = await this.model.create({
            userId: userId,
            projectId: projectId,
            roleId: 1,
            statusId: 1,
          });

          // returns display results for registered volunteers
          const projectJoined = await this.model.findByPk(joinProject.id, {
            include: [
              {
                model: this.project,
                include: [
                  { model: this.user },
                  { model: this.target_comm, attributes: ["name"] },
                ],
              },
              {
                model: this.role,
                attributes: ["id", "name"],
              },
              {
                model: this.status,
                attributes: ["id", "name"],
              },
            ],
          });

          const volunteersCount = await this.volunteer_project.count({
            where: { projectId: projectId },
          });

          return res.status(200).json({
            success: true,
            data: { ...projectJoined.toJSON(), volunteersCount },
            msg: "Success: project registration completed!",
          });
        }
      } else {
        return res.status(400).json({
          error: true,
          msg: "Error: project registration is open to volunteers only.",
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to complete registration.",
      });
    }
  }

  // withdraw from project = display view for unregistered volunteers //
  async withdrawProject(req, res) {
    const { projectId } = req.params;
    const { userId } = req.body;

    try {
      const user = await this.user.findByPk(userId);

      if (user.usertypeId === 1) {
        // check if volunteer has joined the project
        const hasJoined = await this.model.findOne({
          where: { userId: userId, projectId: projectId },
        });
        if (!hasJoined) {
          return res.status(400).json({
            error: true,
            msg: "Error: volunteer has not joined the project yet.",
          });
        } else {
          // volunteer withdraws from project
          await this.model.destroy({
            where: { userId: userId, projectId: projectId },
          });

          // returns display results for unregistered volunteers
          const project = await this.project.findByPk(projectId, {
            include: [
              { model: this.target_comm, attributes: ["name"] },
              {
                model: this.user,
              },
            ],
          });

          const likesCount = await this.liked_project.count({
            where: { projectId: projectId },
          });

          const volunteersCount = await this.model.count({
            where: { projectId: projectId },
          });

          return res.status(200).json({
            success: true,
            data: { ...project.toJSON(), likesCount, volunteersCount },
            msg: "Success: volunteer has withdrawn from the project!",
          });
        }
      } else {
        return res.status(400).json({
          error: true,
          msg: "Error: this request is only valid for volunteers.",
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to withdraw from project.",
      });
    }
  }
}

module.exports = ProjectsRegistrationController;
