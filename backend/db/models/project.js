"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsTo(models.target_comm);

      this.hasMany(models.communication);

      this.hasMany(models.volunteer_project);
      this.belongsToMany(models.user, {
        through: models.volunteer_project,
      });
      this.hasMany(models.liked_project);
      this.belongsToMany(models.user, {
        through: models.liked_project,
      });
    }
  }
  Project.init(
    {
      userId: DataTypes.INTEGER,
      targetCommId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      location: DataTypes.STRING,
      startDate: {
        type: DataTypes.DATE,
        timezone: "+08:00",
      },
      endDate: {
        type: DataTypes.DATE,
        timezone: "+08:00",
      },
      volunteersRequired: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "project",
      underscored: true,
    }
  );
  return Project;
};
