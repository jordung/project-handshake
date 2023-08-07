"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      this.hasMany(models.volunteer_project);
      this.belongsToMany(models.user, {
        through: models.volunteer_project,
      });
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "role",
      underscored: true,
    }
  );
  return Role;
};
