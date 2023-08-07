const BaseController = require("./baseController");

// TODO: change all to "liked" instead of saved
class ProjectsController extends BaseController {
  constructor({ user, project, liked_project }) {
    super(project);

    this.user = user;
    this.project = project;
    this.liked_project = liked_project;
  }

  async getAllProjects(req, res) {
    try {
      let result = await this.model.findAll({
        include: [
          {
            model: this.user,
            attributes: ["name", "usertypeId"],
          },
        ],
      });

      // count the total number of likes the project has received.
      const totalCount = [];
      for (const project of result) {
        const likes = await this.liked_project.count({
          where: { projectId: project.id },
        });
        totalCount.push(likes);
      }

      result = result.map((project, index) => {
        return { ...project.toJSON(), likesCount: totalCount[index] };
      });

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
    try {
      const project = await this.model.findByPk(projectId, {
        include: [
          {
            model: this.user,
            attributes: ["usertypeId"],
          },
        ],
      });

      if (!project) {
        return res.status(404).json({
          error: true,
          msg: "Error: project not found.",
        });
      }

      const likesCount = await this.liked_project.count({
        where: { projectId: projectId },
      });

      return res.status(200).json({
        success: true,
        data: { ...project.toJSON(), likesCount },
        msg: "Success: project data with likes count retrieved!",
      });
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

        return res.status(200).json({
          success: true,
          data: newProject,
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

      const updatedProject = await this.model.findByPk(projectId);

      const likesCount = await this.liked_project.count({
        where: { projectId: projectId },
      });

      return res.status(200).json({
        success: true,
        data: { ...updatedProject.toJSON(), likesCount },
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
