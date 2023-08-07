"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Target_Comm extends Model {
    static associate(models) {
      this.hasMany(models.volunteer);
      this.hasMany(models.project);
    }
  }
  Target_Comm.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "target_comm",
      underscored: true,
    }
  );
  return Target_Comm;
};
