const BaseController = require("./baseController");

// TODO: change all to "liked" instead of saved
class ProjectsController extends BaseController {
  constructor({
    user,
    target_comm,
    project,
    volunteer_project,
    liked_project,
    status,
    role,
    communication,
  }) {
    super(project);

    this.user = user;
    this.target_comm = target_comm;
    this.project = project;
    this.volunteer_project = volunteer_project;
    this.liked_project = liked_project;
    this.status = status;
    this.role = role;
    this.communication = communication;
  }

  async getAllProjects(req, res) {
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

  // * unregistered volunteers --> can join project
  // * registered volunteers --> display registration status
  // * organiser = organiser.id --> display list of volunteers

  async getOneProject(req, res) {
    const { projectId } = req.params;
    const userId = req.query.userId;
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

      const user = await this.user.findByPk(userId);

      // check if user is a volunteer
      if (user.usertypeId === 1) {
        // check if volunteer has already registered for the project
        const alreadyRegistered = await this.volunteer_project.findOne({
          where: { userId: userId, projectId: projectId },
        });

        // for registered volunteers: display project details + registration status.
        if (alreadyRegistered) {
          const registeredVolunteer = await this.volunteer_project.findByPk(
            userId,
            {
              include: [
                {
                  model: this.status,
                  attributes: ["name"],
                },
              ],
              attributes: [],
            }
          );

          const communications = await this.project.findByPk(projectId, {
            include: [
              {
                model: this.communication,
              },
            ],
            attributes: [],
          });

          return res.status(200).json({
            success: true,
            data: {
              ...project.toJSON(),
              likesCount,
              volunteersCount,
              registeredVolunteer,
              communications,
            },
            msg: "Success: retrieved details of the registered volunteer!",
          });
        } else {
          // for unregistered volunteers: display project details only.
          return res.status(200).json({
            success: true,
            data: { ...project.toJSON(), likesCount, volunteersCount },
            msg: "Success: volunteer is not registered for this project!",
          });
        }
        // if usertype != 1, user = organiser
      } else {
        // for organisers: display project details + registered volunteers.
        const projectVolunteers = await this.volunteer_project.findAll({
          where: { projectId: projectId },
          include: [
            {
              model: this.user,
            },
            {
              model: this.status,
              attributes: ["name"],
            },
            {
              model: this.role,
              attributes: ["name"],
            },
          ],
          attributes: [],
        });

        return res.status(200).json({
          success: true,
          data: {
            ...project.toJSON(),
            likesCount,
            volunteersCount,
            projectVolunteers,
          },
          msg: "Success: retrieved information of all registered volunteers, including registration statuses and project roles.",
        });
      }
    } catch {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to retrieve project data.",
      });
    }
  }

  // TODO: Align all data fields with FE req.body
  async addOneProject(req, res) {
    const {
      userId,
      targetComm,
      title,
      description,
      location,
      startDate,
      endDate,
      volunteersReq,
      imageURL,
    } = req.body;

    try {
      const user = await this.user.findByPk(userId);

      // only organisers can add new projects
      if (user.usertypeId === 2 || user.usertypeId === 3) {
        const newProject = await this.model.create({
          userId: userId,
          targetCommId: targetComm,
          title: title,
          description: description,
          location: location,
          // ? Date Format = "2023-02-02T12:00:00.000Z" --> BE to store it as `${DATE}T${TIME}.000Z` ?
          startDate: startDate,
          endDate: endDate,
          volunteersRequired: volunteersReq,
          image: imageURL,
        });

        const createdProject = await this.model.findByPk(newProject.id, {
          include: [
            {
              model: this.user,
            },
            {
              model: this.target_comm,
              attributes: ["name"],
            },
          ],
        });

        const likesCount = await this.liked_project.count({
          where: { projectId: newProject.id },
        });

        const volunteersCount = await this.volunteer_project.count({
          where: { projectId: newProject.id },
        });

        return res.status(200).json({
          success: true,
          data: { ...createdProject.toJSON(), likesCount, volunteersCount },
          msg: "Success: new project added!",
        });
      } else {
        return res.status(400).json({
          error: true,
          msg: "Error: only organisers can add new projects",
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to add new project.",
      });
    }
  }

  // TODO: Align all data fields with FE req.body
  async updateOneProject(req, res) {
    const {
      userId,
      targetComm,
      title,
      description,
      location,
      startDate,
      endDate,
      volunteersReq,
      imageURL,
    } = req.body;
    const { projectId } = req.params;

    try {
      // TODO: Check if FE is validating if user = organiser, otherwise, BE to validate usertype
      await this.model.update(
        {
          userId: userId,
          targetCommId: targetComm,
          title: title,
          description: description,
          location: location,
          // ? Date Format = "2023-02-02T12:00:00.000Z" --> BE to store it as `${DATE}T${TIME}.000Z` ?
          startDate: startDate,
          endDate: endDate,
          volunteersRequired: volunteersReq,
          image: imageURL,
        },
        { where: { id: projectId } }
      );

      const updatedProject = await this.model.findByPk(projectId, {
        include: [
          {
            model: this.user,
          },
          {
            model: this.target_comm,
            attributes: ["name"],
          },
        ],
      });

      const likesCount = await this.liked_project.count({
        where: { projectId: projectId },
      });

      const volunteersCount = await this.volunteer_project.count({
        where: { projectId: projectId },
      });

      return res.status(200).json({
        success: true,
        data: { ...updatedProject.toJSON(), likesCount, volunteersCount },
        msg: "Success: project data updated!",
      });
    } catch {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to update project data.",
      });
    }
  }

  // TODO: Test this after POST method for saved list is up!
  async deleteOneProject(req, res) {
    const { projectId } = req.params;

    try {
      const project = await this.model.findByPk(projectId);

      // check if project exists, else return error 404.
      if (!project) {
        return res.status(404).json({
          error: true,
          msg: "Error: project not found.",
        });
      }

      // ?
      await this.volunteer_project.destroy({
        where: { projectId: projectId },
      });

      await this.liked_project.destroy({
        where: { projectId: projectId },
      });

      await this.model.destroy({
        where: { id: projectId },
      });

      return res.status(200).json({
        success: true,
        msg: "Success: project deleted!",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to delete project",
      });
    }
  }
}

module.exports = ProjectsController;
