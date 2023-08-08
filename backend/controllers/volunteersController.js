const BaseController = require("./baseController");

class VolunteersController extends BaseController {
  constructor({
    project,
    volunteer,
    organiser,
    volunteer_project,
    liked_project,
    user,
  }) {
    super(volunteer_project);

    this.user = user;
    this.project = project;
    this.volunteer = volunteer;
    this.organiser = organiser;
    this.volunteer_project = volunteer_project;
    this.liked_project = liked_project;
  }

  // * MOVE THIS TO VOLUNTEERS CONTROLLER
  async getVolunteerProjects(req, res) {
    const { userId } = req.params;

    try {
      let result = await this.model.findAll({
        where: { userId: userId },
        include: [
          {
            model: this.project,
          },
        ],
        attributes: [],
        order: [[this.project, "startDate"]],
      });

      return res.status(200).json({
        success: true,
        data: result,
        msg: "Success: all volunteer's projects retrieved!",
      });
    } catch {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to retrieve volunteer's projects.",
      });
    }
  }
}

module.exports = VolunteersController;
