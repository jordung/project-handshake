const BaseController = require("./baseController");
const { Sequelize } = require("sequelize");

class OrganisersController extends BaseController {
  constructor({ user, project, volunteer_project, liked_project }) {
    super(project);

    this.user = user;
    this.project = project;
    this.volunteer_project = volunteer_project;
    this.liked_project = liked_project;
    this.Sequelize = Sequelize;
  }

  // API to return all organiser's past & upcoming projects
  async getOrgProjectsTimeline(req, res) {
    const { userId } = req.params;

    try {
      const user = await this.user.findByPk(userId);

      if (user.usertypeId === 1) {
        return res.status(400).json({
          error: true,
          msg: "Error: request can only be performed on organisers!",
        });
      }

      const allOrganiserProjects = await this.model.findAll({
        where: { userId, userId },
        order: [["startDate"]],
      });

      // calculate the total number of projects that organiser has
      const totalProjects = allOrganiserProjects.length;

      // calculate the total number of registered volunteers
      const projectIds = allOrganiserProjects.map((project) => project.id);

      const totalVolunteers = await this.volunteer_project.count({
        where: {
          projectId: { [this.Sequelize.Op.in]: projectIds },
        },
      });

      const currentDate = new Date();

      // get all past projects
      const pastProjects = await this.model.findAll({
        where: {
          userId: userId,
          startDate: { [this.Sequelize.Op.lt]: currentDate },
        },
        include: [
          {
            model: this.liked_project,
            attributes: [],
          },
          {
            model: this.volunteer_project,
            attributes: [],
          },
          {
            model: this.user,
            attributes: ["id", "name", "usertypeId", "profileUrl"],
          },
        ],
        // when using aggregate functions like 'COUNT' we need to list out all the non-aggregated columns
        attributes: [
          "id",
          "userId",
          "targetCommId",
          "title",
          "description",
          "location",
          "startDate",
          "endDate",
          "volunteersRequired",
          "image",
          [
            this.Sequelize.fn(
              "COUNT",
              this.Sequelize.col("liked_projects.project_id")
            ),
            "likesCount",
          ],
          [
            this.Sequelize.fn(
              "COUNT",
              this.Sequelize.col("volunteer_projects.project_id")
            ),
            "volunteersCount",
          ],
        ],
        group: ["project.id", "user.id"],
        order: [["startDate"]],
      });

      // get all upcoming projects
      const upcomingProjects = await this.model.findAll({
        where: {
          userId: userId,
          startDate: { [this.Sequelize.Op.gte]: currentDate },
        },
        include: [
          {
            model: this.liked_project,
            attributes: [],
          },
          {
            model: this.volunteer_project,
            attributes: [],
          },
          {
            model: this.user,
            attributes: ["id", "name", "usertypeId", "profileUrl"],
          },
        ],
        // when using aggregate functions like 'COUNT' we need to list out all the non-aggregated columns
        attributes: [
          "id",
          "userId",
          "targetCommId",
          "title",
          "description",
          "location",
          "startDate",
          "endDate",
          "volunteersRequired",
          "image",
          [
            this.Sequelize.fn(
              "COUNT",
              this.Sequelize.col("liked_projects.project_id")
            ),
            "likesCount",
          ],
          [
            this.Sequelize.fn(
              "COUNT",
              this.Sequelize.col("volunteer_projects.project_id")
            ),
            "volunteersCount",
          ],
        ],
        group: ["project.id", "user.id"],
        order: [["startDate"]],
      });

      return res.status(200).json({
        success: true,
        data: {
          totalProjects: totalProjects,
          totalVolunteers: totalVolunteers,
          pastProjects,
          upcomingProjects,
        },
        msg: "Success: retrieved all organiser's past and upcoming projects!",
      });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        error: true,
        msg: "Error: unable to retrieve organiser's past and upcoming projects.",
      });
    }
  }
}

module.exports = OrganisersController;
