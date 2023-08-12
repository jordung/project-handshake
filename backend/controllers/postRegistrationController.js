const BaseController = require("./baseController");

class PostRegistrationController extends BaseController {
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

  async updateVolunteerRegistration(req, res) {
    const { projectId, updatedStatus, updatedRole, volunteerId } = req.body;

    try {
      await this.volunteer_project.update(
        {
          statusId: updatedStatus,
          roleId: updatedRole,
        },
        { where: { userId: volunteerId, projectId: projectId } }
      );

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

      const communications = await this.project.findByPk(projectId, {
        include: [
          {
            model: this.communication,
          },
        ],
        attributes: [],
      });

      const projectVolunteers = await this.volunteer_project.findAll({
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
        data: {
          ...project.toJSON(),
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
}

module.exports = PostRegistrationController;

// async getRegisteredVolunteers(req, res) {
//   const { projectId } = req.params;
//   const userId = req.query.userId;
//   try {
//     // ===== [ALL USERS]: display project details ===== //
//     const project = await this.model.findByPk(projectId, {
//       include: [
//         {
//           model: this.target_comm,
//           attributes: ["name"],
//         },
//         {
//           model: this.user,
//         },
//         {
//           model: this.communication,
//         },
//       ],
//     });

//     const volunteersCount = await this.volunteer_project.count({
//       where: { projectId: projectId },
//     });

//     const likesCount = await this.liked_project.count({
//       where: { projectId: projectId },
//     });

//     // Filter out communication data if it's empty
//     // const communications = project.communication ? project.communication : [];

//     // check if projects exists
//     if (!project) {
//       return res.status(404).json({
//         error: true,
//         msg: "Error: project not found.",
//       });
//     }

//     if (project.userId === parseInt(userId)) {
//       // ===== [PROJECT ORGANISER]: display project details + registered volunteers (statuses & roles) + comms ===== //
//       const projectVolunteers = await this.volunteer_project.findAll({
//         where: { projectId: projectId },
//         include: [
//           {
//             model: this.user,
//           },
//           {
//             model: this.status,
//             attributes: ["id", "name"],
//           },
//           {
//             model: this.role,
//             attributes: ["id", "name"],
//           },
//         ],
//         attributes: [],
//       });

//       return res.status(200).json({
//         success: true,
//         data: {
//           ...project.toJSON(),
//           likesCount,
//           volunteersCount,
//           projectVolunteers,
//         },
//         msg: "Success: retrieved information of all registered volunteers, including registration statuses and project roles.",
//       });
//       // ? not sure if we need this
//       // } else {
//       //   // ===== [ALL OTHER ORGANISERS]: display project details ===== //
//       //   return res.status(200).json({
//       //     success: true,
//       //     data: { ...project.toJSON(), likesCount, volunteersCount },
//       //     msg: "Success: userId does not belong to the project organiser's userId!",
//       //   });
//     }
//   } catch {
//     return res.status(400).json({
//       error: true,
//       msg: "Error: unable to retrieve project data.",
//     });
//   }
// }
