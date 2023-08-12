const BaseController = require("./baseController");
const { Op } = require("sequelize");

class UsersController extends BaseController {
  constructor({ user, target_comm, volunteer, organiser }) {
    super(user);

    this.user = user;
    this.target_comm = target_comm;
    this.volunteer = volunteer;
    this.organiser = organiser;
  }

  async getAllOrganisers(req, res) {
    try {
      const organisers = await this.model.findAll({
        where: {
          usertypeId: { [Op.or]: [2, 3] },
        },
        include: [
          {
            model: this.organiser,
            attributes: ["website"],
          },
        ],
      });

      return res.status(200).json({
        success: true,
        data: organisers,
        msg: "Success: retrieved data for all organisers!",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to retrieve all organisers.",
      });
    }
  }

  async getOneOrganiser(req, res) {
    const { userId } = req.params;
    try {
      const organiser = await this.model.findByPk(userId, {
        include: [
          {
            model: this.organiser,
            attributes: ["website"],
          },
        ],
      });

      return res.status(200).json({
        success: true,
        data: organiser,
        msg: "Success: organiser data retrieved!",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to retrieve data for organiser.",
      });
    }
  }

  // TODO: Check if this could be used to redirect users to home page upon signing in!
  // This API call will return 'volunteers' and 'organisers' tables if usertype = 1 and 2,3 respectively.
  async getOneUser(req, res) {
    const email = req.query.email;
    try {
      const user = await this.model.findOne({
        where: { email: email },
        include: [
          {
            model: this.volunteer,
            include: { model: this.target_comm, attributes: ["name"] },
          },
          this.organiser,
        ],
      });

      // check if user exists, else return error 404 & redirect them to signup/set profile page.
      if (!user) {
        return res.status(404).json({
          error: true,
          msg: "Error: user not found.",
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
        msg: "Success: user data retrieved!",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to retrieve user data.",
      });
    }
  }

  async addOneUser(req, res) {
    const {
      userType,
      name,
      username,
      email,
      phoneNumber,
      biography,
      userLocation,
      profilePicture,
    } = req.body;

    try {
      // assign an integer depending on the 'userType' sent from req.body (FE)
      let usertype_id;

      if (userType === "volunteer") {
        usertype_id = 1;
      } else if (userType === "organisation") {
        usertype_id = 2;
      } else if (userType === "team") {
        usertype_id = 3;
      } else {
        return res.status(400).json({
          error: true,
          msg: "Error: invalid user type",
        });
      }

      // TODO: Retrieve email from Auth0!
      const newUser = await this.model.create({
        usertypeId: usertype_id,
        name: name,
        username: username,
        email: email,
        phone: phoneNumber,
        biography: biography,
        location: userLocation,
        profileUrl: profilePicture,
      });

      // add a new row to 'volunteers' table if usertype = 1
      if (newUser.usertypeId === 1) {
        await this.volunteer.create({
          userId: newUser.id,
        });
      } else {
        // add a new row to 'organisers' table if usertype = 2
        await this.organiser.create({
          userId: newUser.id,
        });
      }
      return res.status(200).json({
        success: true,
        data: newUser,
        msg: `Success: new user with user type '${userType}' added!`,
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to add new user.",
      });
    }
  }

  // TODO: Align "targetComm" data field with FE req.body
  async updateOneUser(req, res) {
    const {
      phoneNumber,
      biography,
      userLocation,
      profilePicture,
      targetComm,
      website,
    } = req.body;
    const { userId } = req.params;

    try {
      // the following data fields can be updated by both volunteers & organisers
      await this.model.update(
        {
          phone: phoneNumber,
          biography: biography,
          location: userLocation,
          profileUrl: profilePicture,
        },
        { where: { id: userId } }
      );

      const user = await this.model.findByPk(userId);

      // for volunteers, they have an additional option to update the 'target_comm' field
      if (user.usertypeId === 1) {
        await this.volunteer.update(
          { targetCommId: targetComm },
          { where: { userId: user.id } }
        );
      } else {
        // for organisers, they have an additional option to update the 'website' field
        await this.organiser.update(
          { website: website },
          { where: { userId: user.id } }
        );
      }

      const updatedInfo = await this.model.findByPk(userId, {
        include: [this.volunteer, this.organiser],
      });

      return res.status(200).json({
        success: true,
        data: updatedInfo,
        msg: "Success: user details updated!",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to update user details.",
      });
    }
  }

  // TODO: Review and include all associated tables tagged to user.id!
  async deleteOneUser(req, res) {
    const { userId } = req.params;
    try {
      const user = await this.model.findByPk(userId);

      // check if user exists
      if (!user) {
        return res.status(404).json({
          error: true,
          msg: "Error: user not found.",
        });
      }

      if (user.usertypeId === 1) {
        // delete associated record from the 'volunteers' (child) table
        await this.volunteer.destroy({
          where: { userId: userId },
        });
        // delete associated record from 'users' (parent) table
        await this.model.destroy({
          where: { id: userId },
        });
      } else {
        // delete associated record from the 'organisers' (child) table
        await this.organiser.destroy({
          where: { userId: userId },
        });
        // delete associated record from 'users' (parent) table
        await this.model.destroy({
          where: { id: userId },
        });
      }

      return res.status(200).json({
        success: true,
        msg: "Success: user has been removed from Handshake!",
      });
    } catch (error) {
      return res.status(400).json({
        error: true,
        msg: "Error: unable to remove user.",
      });
    }
  }
}

module.exports = UsersController;
