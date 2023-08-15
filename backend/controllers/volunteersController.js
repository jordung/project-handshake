const BaseController = require("./baseController");

class VolunteersController extends BaseController {
  constructor({ user, project, volunteer_project }) {
    super(volunteer_project);

    this.user = user;
    this.project = project;
    this.volunteer_project = volunteer_project;
  }

  async getAllVolunteersProjects(req, res) {
    try {
      const allProjects = await this.model.findAll({
        include: [
          {
            model: this.user,
            attributes: ["name"],
          },
          {
            model: this.project,
            attributes: ["id", "userId"],
            include: [
              {
                model: this.user,
                attributes: ["name"],
              },
            ],
          },
        ],
        attributes: [],
      });
      return res.status(200).json({
        success: true,
        data: allProjects,
        msg: "Success: volunteers' projects retrieved!",
      });
    } catch {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to retrieve all volunteers' projects.",
      });
    }
  }

  async getProjectsTimeline(req, res) {
    const { userId } = req.params;

    try {
      const upcomingProjects = await this.model.findAll({
        where: { userId: userId },
        include: [
          {
            model: this.project,
            include: [
              {
                model: this.user,
              },
            ],
          },
        ],
        attributes: [],
        order: [[this.project, "startDate"]],
      });

      const latestProjects = await this.model.findAll({
        where: { userId: userId },
        include: [
          {
            model: this.project,
            include: [
              {
                model: this.user,
              },
            ],
          },
        ],
        order: [["id", "DESC"]],
      });

      // count the total hours clocked by the volunteer
      const hoursClocked = await this.model.findAll({
        where: { userId: userId },
        include: [{ model: this.project }],
      });

      let totalHoursClocked = 0;

      hoursClocked.forEach((project) => {
        const startDate = new Date(project.project.startDate);
        const endDate = new Date(project.project.endDate);

        const timeDifference = endDate - startDate;
        const convertToHours = timeDifference / (1000 * 60 * 60);

        totalHoursClocked += convertToHours;
      });

      return res.status(200).json({
        success: true,
        data: {
          totalHoursClocked: totalHoursClocked,
          upcomingProjects,
          latestProjects,
        },
        msg: "Success: all upcoming and latest projects retrieved!",
      });
    } catch {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to retrieve all upcoming and latest projects.",
      });
    }
  }
}

module.exports = VolunteersController;
