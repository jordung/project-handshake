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

  // * API call will return volunteer's upcoming projects
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

      // calculate total number of projects
      const totalProjects = allOrganiserProjects.length;

      // get current date
      const currentDate = new Date();

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

// retrieve project_ids and the associated volunteer counts - this will return an array of all projects with registered volunteers!
// const countAllProjectsVolunteers = await this.volunteer_project.findAll({
//   attributes: [
//     "project_id",
//     [this.Sequelize.fn("COUNT", "project_id"), "volunteersCount"],
//   ],
//   group: ["project_id"],
//   raw: true, // Get raw data without Sequelize model wrapping
// });

// let totalVolunteers = 0;

// use optional chaining operator '.?' to access the 'volunteersCount' property of the object if it exists, else, return 0.
// const projectStatistics = allOrganiserProjects.map(async (project) => {
//   const volunteers =
//     countAllProjectsVolunteers.find(
//       (count) => count.project_id === project.id
//     )?.volunteersCount || 0;

//   totalVolunteers += parseInt(volunteers);

//   // count the total number of likes the project has received
//   const likesCount = await this.liked_project.count({
//     where: { project_id: project.id },
//   });

//   return {
//     projectId: project.id,
//     volunteersCount: parseInt(volunteers),
//     likesCount: likesCount,
//   };
// });
