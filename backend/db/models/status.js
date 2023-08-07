"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      this.hasMany(models.volunteer_project);
      this.belongsToMany(models.user, {
        through: models.volunteer_project,
      });
    }
  }
  Status.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "status",
      underscored: true,
    }
  );
  return Status;
};
