"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Volunteer_Project extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsTo(models.project);
      this.belongsTo(models.role);
      this.belongsTo(models.status);
    }
  }
  Volunteer_Project.init(
    {
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
      statusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "volunteer_project",
      underscored: true,
    }
  );
  return Volunteer_Project;
};
