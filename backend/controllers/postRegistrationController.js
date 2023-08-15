const BaseController = require("./baseController");

class PostRegistrationController extends BaseController {
  constructor({ user, volunteer_project, status, role }) {
    super(volunteer_project);

    this.user = user;
    this.volunteer_project = volunteer_project;
    this.status = status;
    this.role = role;
  }

  // This API allows the project organiser (admin) to update the volunteer's registration status and/or assign the volunteer a role.
  async updateVolunteerRegistration(req, res) {
    const { projectId, updatedStatus, updatedRole, volunteerId } = req.body;

    try {
      await this.model.update(
        {
          statusId: updatedStatus,
          roleId: updatedRole,
        },
        { where: { userId: volunteerId, projectId: projectId } }
      );

      const projectVolunteers = await this.model.findAll({
        where: { projectId: projectId },
        include: [
          {
            model: this.user,
          },
          {
            model: this.status,
            attributes: ["id", "name"],
          },
          {
            model: this.role,
            attributes: ["id", "name"],
          },
        ],
        attributes: [],
      });

      return res.status(200).json({
        success: true,
        data: projectVolunteers,
        msg: "Success: updated volunteer's status and/or role!",
      });
    } catch {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to update volunteer's status and/or role.",
      });
    }
  }
}

module.exports = PostRegistrationController;
