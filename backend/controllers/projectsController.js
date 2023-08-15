const BaseController = require("./baseController");
const { Op } = require("sequelize");

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
    comment,
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
    this.comment = comment;
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

      // count the total number of likes the project has received
      const totalCount = projects.map(async (project) => {
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

  async getOneProject(req, res) {
    const { projectId } = req.params;
    const userId = req.query.userId;
    try {
      // ===== [ALL USERS]: display project details ===== //
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

      const likesCount = await this.liked_project.count({
        where: { projectId: projectId },
      });

      const findCommunications = await this.project.findByPk(projectId, {
        include: [
          {
            model: this.communication,
            include: [
              {
                model: this.comment,
              },
            ],
          },
        ],
        attributes: [],
      });

      // count the total number of comments tied to each communication
      const communications = findCommunications.communications.map(
        (communication) => {
          const commentCount = communication.comments.length;
          return { ...communication.toJSON(), totalComments: commentCount };
        }
      );

      // check if projects exists
      if (!project) {
        return res.status(404).json({
          error: true,
          msg: "Error: project not found.",
        });
      }

      // check if userId exists, if no = user is unauthenticated
      if (!userId) {
        return res.status(200).json({
          success: true,
          data: { ...project.toJSON(), likesCount, volunteersCount },
          msg: "Success: volunteer is not registered for this project!",
        });
      }

      const user = await this.user.findByPk(userId);

      // check if user is a volunteer
      if (user.usertypeId === 1) {
        // check if volunteer has already registered for the project
        const alreadyRegistered = await this.volunteer_project.findOne({
          where: { userId: userId, projectId: projectId },
        });

        // ===== [REGISTERED VOLUNTEERS]: display project details + registration status + comms ===== //
        if (alreadyRegistered) {
          const registeredVolunteer = await this.volunteer_project.findOne({
            where: { userId: userId, projectId: projectId },
            include: [
              {
                model: this.role,
                attributes: ["id", "name"],
              },
              {
                model: this.status,
                attributes: ["id", "name"],
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
          // ===== [UNREGISTERED VOLUNTEERS]: display project details ===== //
          return res.status(200).json({
            success: true,
            data: { ...project.toJSON(), likesCount, volunteersCount },
            msg: "Success: volunteer is not registered for this project!",
          });
        }
      } else {
        // if usertype != 1, user = organiser; check if organiser is the project organiser
        if (project.userId === parseInt(userId)) {
          // ===== [PROJECT ORGANISER]: display project details + registered volunteers (statuses & roles) + comms ===== //
          const projectVolunteers = await this.volunteer_project.findAll({
            where: { projectId: projectId },
            include: [
              {
                model: this.user,
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
            attributes: [],
          });

          return res.status(200).json({
            success: true,
            data: {
              ...project.toJSON(),
              likesCount,
              volunteersCount,
              projectVolunteers,
              communications,
            },
            msg: "Success: retrieved information of all registered volunteers, including registration statuses and project roles.",
          });
        } else {
          // ===== [ALL OTHER ORGANISERS]: display project details ===== //
          return res.status(200).json({
            success: true,
            data: { ...project.toJSON(), likesCount, volunteersCount },
            msg: "Success: volunteer is not registered for this project!",
          });
        }
      }
    } catch {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to retrieve project data.",
      });
    }
  }

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
      await this.model.update(
        {
          userId: userId,
          targetCommId: targetComm,
          title: title,
          description: description,
          location: location,
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

      const likesCount = await this.liked_project.count({
        where: { projectId: projectId },
      });

      const projectVolunteers = await this.volunteer_project.findAll({
        where: { projectId: projectId },
        include: [
          {
            model: this.user,
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
        attributes: [],
      });

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
          ...updatedProject.toJSON(),
          likesCount,
          volunteersCount,
          projectVolunteers,
          communications,
        },
        msg: "Success: project data updated!",
      });
    } catch {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to update project data.",
      });
    }
  }

  // This API removes a project from handshake, including all associated records in other tables!
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

      // retrieve the list of communications tied to the project id
      const allProjectCommunications = await this.communication.findAll({
        where: { projectId: projectId },
        attributes: ["id"],
      });

      // extract communication ids from the result
      const communicationIds = allProjectCommunications.map((comm) => comm.id);

      // use [Op.in] to remove multiple values
      await this.comment.destroy({
        where: { communicationId: { [Op.in]: communicationIds } },
      });

      await this.communication.destroy({
        where: { projectId: projectId },
      });

      await this.liked_project.destroy({
        where: { projectId: projectId },
      });

      await this.volunteer_project.destroy({
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
