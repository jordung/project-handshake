"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Liked_Project extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsTo(models.project);
    }
  }
  Liked_Project.init(
    {
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "liked_project",
      underscored: true,
    }
  );
  return Liked_Project;
};
