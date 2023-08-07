"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.usertype);
      this.hasOne(models.volunteer);
      this.hasOne(models.organiser);
      this.hasMany(models.project);
      this.hasMany(models.communication);
      this.hasMany(models.comment);

      this.hasMany(models.volunteer_project);
      this.belongsToMany(models.project, {
        through: models.volunteer_project,
      });
      this.belongsToMany(models.role, {
        through: models.volunteer_project,
      });
      this.belongsToMany(models.status, {
        through: models.volunteer_project,
      });

      this.hasMany(models.liked_project);
      this.belongsToMany(models.project, {
        through: models.liked_project,
      });
    }
  }
  User.init(
    {
      usertypeId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      phone: DataTypes.STRING,
      biography: DataTypes.TEXT,
      location: DataTypes.STRING,
      profileUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
